const restaurantData = {
    name: "Gelote Burguer",
    description: "Hambúrgueria com toque de chef",
    // Schedule: 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    // Format: 'HH:MM'
    schedule: [
        { days: [1, 2, 3, 4, 5], open: "11:00", close: "23:00" }, // Mon-Fri
        { days: [6], open: "11:00", close: "23:00" },             // Sat
        { days: [0], open: "17:00", close: "22:00" }              // Sun
    ],
    whatsapp: "5511967384520", // Format: CountryCodeAreaCodeNumber
    avatarUrl: "https://fv5-7.files.fm/thumb_show.php?i=cgg6nye4xj&view&v=1&PHPSESSID=347514fa570594bc77fbb00901b0ddebae924a0b",
    bannerUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    address: "Rua Sebastião Annunciatto, 377 - Jardim Celeste - SP",
    menu: [
        {
            id: "lanches-artesanais-combo",
            title: "LANCHES ARTESANAIS (COMBO)",
            items: [
                {
                    name: "GL BURGUER",
                    description: "Pão, hamburguer artesanal.",
                    price: 28.00, // Keeping price as placeholder since user didn't specify
                    image: "https://files.fm/f/rtkdyad6w7"
                },
                {
                    name: "GL SALAD ",
                    description: "Pão, hamburguer artesanal, alface, tomate.", // Added salad ingredients based on name "SALAD"
                    price: 28.00, // Keeping price as placeholder since user didn't specify
                    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                },
                {
                    name: "GL BACON ",
                    description: "Pão, hamburguer artesanal, bacon.", // Added bacon based on name "BACON"
                    price: 30.00, // Keeping price as placeholder since user didn't specify
                    image: "https://fv5-5.files.fm/thumb_show.php?i=ktv5wb7jcs&view&v=1&PHPSESSID=347514fa570594bc77fbb00901b0ddebae924a0b"
                }
            ]
        },
        {
            id: "lanches-tradicionais-combo",
            title: "LANCHES TRADICIONAIS (COMBO)",
            items: [
                {
                    name: "N 1 - BIG",
                    description: "Pão com gergilim, 2 hambúrgueres, molho especial, presunto, alface, tomate. Acompanha fritas e refri.",
                    price: 22.00,
                    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                },
                {
                    name: "N 2 - BIG BACON",
                    description: "Pão com gergilim, 2 hambúrgueres, molho especial, bacon, queijo, alface, tomate. Acompanha fritas e refri",
                    price: 22.00,
                    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                },
                {
                    name: "N 3 - BIG CHEDDAR",
                    description: "Pão com gergilim, 2 hambúrgueres, molho especial, cheddar, queijo, alface, tomate. Acompanha fritas e refri",
                    price: 22.00,
                    image: "https://images.unsplash.com/photo-1549611016-3a70d82b5040?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                }
            ]
        },
        {
            id: "lanches-individuais",
            title: "LANCHES INDIVIDUAIS",
            items: [
                {
                    name: "X-Burger Individual",
                    description: "Pão com gergilim, 1 hambúrguer, molho especial, queijo.",
                    price: 10.00,
                    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                },
                {
                    name: "X-Chicken Individual",
                    description: "Pão com gergilim, 1 hambúrguer de frango, molho especial, queijo.",
                    price: 10.00,
                    image: "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                },
                {
                    name: "X-Salada Individual",
                    description: "Pão com gergilim, hambúrguer, molho especial, queijo, alface, tomate.",
                    price: 10.00,
                    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                }
            ]
        },
        {
            id: "refrigerantes",
            title: "REFRIGERANTES",
            items: [
                {
                    name: "Refrigerante em lata 350ml",
                    description: "Gelada.",
                    price: 5.00,
                    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                },
                {
                    name: "Refrigerante 600ml",
                    description: "O original.",
                    price: 7.00,
                    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                },
                {
                    name: "Refrigerante 1,5",
                    description: "Refrescante.",
                    price: 11.00,
                    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                }
            ]
        },
        {
            id: "batata",
            title: "BATATA",
            items: [
                {
                    name: "Batata Frita Individual",
                    description: "Porção individual.",
                    price: 8.00,
                    image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                },
                {
                    name: "N 16 - 4 Batatas",
                    description: "Porção de batata frita grande.",
                    price: 26.00,
                    image: "https://images.unsplash.com/photo-1573080496987-a2267f8e8741?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                },
                {
                    name: "Batata Frita - Cheddar e Bacon",
                    description: "Temperada com ervas finas.",
                    price: 18.00,
                    image: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                }
            ]
        },
        {
            id: "para-1-pessoa",
            title: "PARA 1 PESSOA - COMBOS",
            items: [
                {
                    name: "GL BACON CREAM",
                    description: "Pão brioche, hambúrguer 120g, catupiry e bacon",
                    price: 30.00,
                    image: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                },
                {
                    name: "GL SUPREME",
                    description: "Pão brioche, hambúrguer 120g, alface, tomate, catupiry e bacon",
                    price: 30.00,
                    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                },
                {
                    name: "GELOTE BBQ BACON",
                    description: "Pão brioche, hambúrguer 120g, queijo, molho barbecue e bacon",
                    price: 30.00,
                    image: "https://images.unsplash.com/photo-1626082927389-6cd09d6d96ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                }
            ]
        },
        {
            id: "para-2-pessoas",
            title: "PARA 2 PESSOAS",
            items: [
                {
                    name: "2 TRADICIONAIS",
                    description: "Pão com gergilim, 2 hambúrgueres, molho especial, queijo, alface e tomate",
                    price: 25.00,
                    image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                },
                {
                    name: "N 14 - 2 BIG BACON",
                    description: "2 big bacon barbecue + 2 Batatas + 2 refrigerantes de lata.",
                    price: 75.00,
                    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                },
                {
                    name: "GL BOX",
                    description: "Dois lanches artesanais (escolha entre: GL SUPREME, GL CHEDDAR BACON, GL CHICKEN, GELOTE BBQ BACON ou GL BACON CREAM) batata com cheddar e bacon + 2 refri lata 269ml.",
                    price: 60.00,
                    image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                }
            ]
        },
        {
            id: "para-3-a-4-pessoas",
            title: "PARA 3 A 4 PESSOAS",
            items: [
                {
                    name: "BARCA BATATA FRITA",
                    description: "Com cheddar e bacon",
                    price: 30.00,
                    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                },
                {
                    name: "N 10 - Combo",
                    description: "4 un. X-Cheddar + 2 Batatas + 1 Refrigerante 600ml.",
                    price: 50.00,
                    image: "https://images.unsplash.com/photo-1625938144755-652e08e359b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                },
                {
                    name: "N 11 - Combo",
                    description: "4 un. X-Bacon + 2 Batatas + 1 Refrigerante 600ml.",
                    price: 50.00,
                    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                }
            ]
        },
        {
            id: "para-5-pessoas",
            title: "PARA 5 PESSOAS",
            items: [
                {
                    name: "N 6 - Combo",
                    description: "5 un. Big bacon + 1 Refri 1,5L",
                    price: 65.00,
                    image: "https://images.unsplash.com/photo-1521305916504-4a1121188589?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                },
                {
                    name: "N 8 - Combo",
                    description: "5 un. Big (Tradicionais)+ 3 un. Batata + 1 Refri 1,5L.",
                    price: 75.00,
                    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                },
                {
                    name: "N 7 - Combo",
                    description: "5 un. Big (Tradicionais)+ 1 Refri 1,5L.",
                    price: 60.00,
                    image: "https://images.unsplash.com/photo-1631515243349-e06036043944?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                }
            ]
        },
        {
            id: "para-6-pessoas",
            title: "PARA 6 PESSOAS",
            items: [
                {
                    name: "N 9 - Combo",
                    description: "6 un. Big (Tradicionais) + 4 un.  Batatas + 1 Refri 1,5L.",
                    price: 150.00,
                    image: "https://images.unsplash.com/photo-1574126154517-d1e0d89e7344?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                }
            ]
        },
        {
            id: "para-10-pessoas",
            title: "PARA 10 PESSOAS",
            items: [
                {
                    name: "N 15 - Combo ",
                    description: "10 un. X-Salada + 10 un. Batata + 1 Refri 1,5L.",
                    price: 160.00,
                    image: "https://images.unsplash.com/photo-1530554764233-e79e16c91d08?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                }
            ]
        },
        {
            id: "para-20-pessoas",
            title: "Para 20 PESSOAS",
            items: [
                {
                    name: "Buffet Express 20",
                    description: "20 un. X-Salada + 2 Refrigerantes 2L.",
                    price: 170.00,
                    image: "https://images.unsplash.com/photo-1519225421980-715cb0202128?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                }
            ]
        }
    ]
};
