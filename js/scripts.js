jQuery(document).ready(function(){
    var products = [
        { enName: 'box', ruName:'Коробка', price: '35000' },
        { enName: 'sweet', ruName: 'Леденцы', price: '39000' },
        { enName: 'candle', ruName:'Свеча', price: '91000' },
        { enName: 'toy', ruName:'Игрушка', price: '65000' },
        { enName: 'cupwhite', ruName:'Чашка белая', price: '91000' },
        { enName: 'tea', ruName:'Кофе/Чай', price: '585000' },
        { enName: 'honey', ruName:'Мед', price: '65000' },
        { enName: 'notebook', ruName:'Блокнот в эко обложке', price: '65000' },
        { enName: 'carholder', ruName:'Визитница', price: '130000' },
        { enName: 'sleepmask', ruName:'Маска для сна', price: '156000' },
        { enName: 'ball', ruName:'Мяч антистресс', price: '48500' },
        { enName: 'cookie', ruName:'Имбирное печенье', price: '32500' },
        { enName: 'syrup', ruName:'Сироп в ассортименте', price: '169000' },
        { enName: 'cuptogo', ruName:'Чашка to go', price: '260000' },
        { enName: 'coloring', ruName:'Раскраска', price: '65000' },
        { enName: 'wine', ruName:'Чашка для глинтвейна', price: '78000' },
        { enName: 'spice', ruName:'Специи в мешочке', price: '52000' },
        { enName: 'cinnamon', ruName:'Палочки корицы', price: '26000' }

    ];

    var form = $('#products-form');

    function renderProductCheckbox(product){
        return $('<input/>', {
            type: 'checkbox',
            name: product.enName,
            id: product.enName,
            html: product.ruName,
            value: product.price
        })
    }

    function renderLabelForProductCheckbox(product) {
        var checkbox = renderProductCheckbox(product);
        return $('<label/>', {
            for: product.enName,
            html: product.ruName
        }).prepend(checkbox);
    }

    products.forEach(function(product) {
        var labeledCheckbox = renderLabelForProductCheckbox(product);
        labeledCheckbox.appendTo(form);
    });

    function calculateTotalPrice() {
        var price = 0;

        $('input[type="checkbox"]:checked').each(function(index, checkbox) {
            var productPrice = parseInt(checkbox.value);
            
            price += productPrice;
        });

        return price;
    }




    function reloadTotalPrice() {
        var totalPrice = calculateTotalPrice(),
            priceBlock = $('#totalPrice');

        if (totalPrice) {
            priceBlock.html('Стоимость вашей коробки ' + totalPrice + ' BYR');
        } else {
            priceBlock.html('Выберите продукты')
        }
    }

    reloadTotalPrice();

    $('input[type="checkbox"]').click(reloadTotalPrice);
});
