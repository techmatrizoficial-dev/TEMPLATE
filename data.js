const restaurantData = {
    name: "Sabor & Arte",
    description: "Culinária caseira com toque de chef",
    // Schedule: 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    // Format: 'HH:MM'
    schedule: [
        { days: [1, 2, 3, 4, 5], open: "11:00", close: "23:00" }, // Mon-Fri
        { days: [6], open: "11:00", close: "23:00" },             // Sat
        { days: [0], open: "17:00", close: "22:00" }              // Sun
    ],
    whatsapp: "5511967384520", // Format: CountryCodeAreaCodeNumber
    avatarUrl: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    address: "Rua das Flores, 123 - Centro, Fortaleza - CE",
    menu: [
        {
            id: "pratos",
            title: "Pratos Principais",
            items: [
                {
                    name: "Feijoada Completa",
                    description: "Acompanha arroz, couve, farofa e laranja. Serve 2 pessoas.",
                    price: 45.90,
                    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                },
                {
                    name: "Bife a Cavalo",
                    description: "Contra-filé grelhado com ovo frito, arroz e batatas fritas.",
                    price: 29.90,
                    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                },
                {
                    name: "Frango Grelhado Light",
                    description: "Filé de frango com salada variada e purê de batata doce.",
                    price: 24.50,
                    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                }
            ]
        },
        {
            id: "lanches",
            title: "Lanches",
            items: [
                {
                    name: "X-Tudo Artesanal",
                    description: "Hambúrguer 180g, queijo, presunto, bacon, ovo, alface e tomate.",
                    price: 22.00,
                    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                },
                {
                    name: "Sanduíche Natural",
                    description: "Pão integral, patê de frango, cenoura e rúcula.",
                    price: 12.00,
                    image: "https://images.unsplash.com/photo-1554433607-66b5efe9d304?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                }
            ]
        },
        {
            id: "bebidas",
            title: "Bebidas",
            items: [
                {
                    name: "Suco de Laranja Natural",
                    description: "500ml, feito na hora.",
                    price: 8.00,
                    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                },
                {
                    name: "Refrigerante Lata",
                    description: "Coca-cola, Guaraná, Sprite.",
                    price: 6.00,
                    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                }
            ]
        },
        {
            id: "sobremesas",
            title: "Sobremesas",
            items: [
                {
                    name: "Pudim de Leite",
                    description: "Tradicional pudim de leite condensado.",
                    price: 9.90,
                    image: "https://images.unsplash.com/photo-1595908129746-259146522c17?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                },
                {
                    name: "Brownie com Sorvete",
                    description: "Brownie de chocolate meio amargo com bola de sorvete de creme.",
                    price: 15.50,
                    image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                }
            ]
        }
    ]
};
