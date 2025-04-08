import http from "http";

const PORT = 4090;

const produits = [
    { id: 1, name: "Ordinateur Portable", price: 799.99 },
    { id: 2, name: "Smartphone", price: 599.99 },
    { id: 3, name: "Clavier Mécanique", price: 89.90 },
    { id: 4, name: "Écran 27 pouces", price: 249.00 },
    { id: 5, name: "Casque Audio", price: 129.50 },
    { id: 6, name: "Souris Gamer", price: 49.99 },
    { id: 7, name: "Disque Dur SSD 1To", price: 109.00 },
    { id: 8, name: "Imprimante", price: 179.90 },
    { id: 9, name: "Tablette Graphique", price: 229.99 },
    { id: 10, name: "Station de charge", price: 39.99 }
];

/**
 * Renvoi un produit de la BDD en fonction de son id
 * @param {{id:number,name:string,price:number}|undefined} id 
 * @returns 
 */
function getProductById(id) {
    return produits.find(produit => produit.id == id);
}

function getAllProducts(){
    /*Codez ici... pour l'exercice 5*/
}

/**
 * Un serveur http qui possède la route 
 * /product?id=1
 * 
 * Cette route permet de récupérer un produit au format Json en fonction de son ID .
 */
http.createServer((req, res) => {

    const urlInfos = new URL(`http://${req.headers.host ?? "localhost"}${req.url ?? "/"}`);

    // En foncton de la route tapé par l'utilisateur
    switch (urlInfos.pathname) {
        case "/product":
            
            const productId = urlInfos.searchParams.get("id");
            
            const product = getProductById(productId);

            if (product) {
                // Le produit existe !
                res.appendHeader("Content-Type","application/json");
                const jsonProduct = JSON.stringify(product);
                // Je renvoi le produit au format JSON
                res.write(jsonProduct); 

            }else{
                // Le produit n'existe pas !
                res.statusCode = 404;
                res.write("Unknow Product\n");
            }
            break;
        
        default:
            // Route inconnu
            res.statusCode = 404;
            res.write("Unknow Route\n");
            break;
    }
    // Fermer la connexion avec le client
    res.end();


}).listen(PORT, () => console.log(`Server listen on http://localhost:${PORT}`));