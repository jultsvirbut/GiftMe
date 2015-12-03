jQuery(document).ready(function(){
    var products = [
        { enName: 'pen', ruName:'Канцелярская ручка', price: '24000' },
        { enName: 'sweet', ruName: 'Леденцы', price: '39000' },
        { enName: 'candle', ruName:'Свеча', price: '91000' },
        { enName: 'toy', ruName:'Игрушка', price: '65000' },
        { enName: 'cupwhite', ruName:'Кружка белая', price: '91000' },
        { enName: 'tea', ruName:'Кофе/Чай', price: '56000' },
        { enName: 'honey', ruName:'Мед', price: '65000' },
        { enName: 'notebook', ruName:'Блокнот в эко обложке', price: '65000' },
        { enName: 'cardholder', ruName:'Визитница', price: '130000' },
        { enName: 'sleepmask', ruName:'Маска для сна', price: '156000' },
        { enName: 'ball', ruName:'Мяч антистресс', price: '56000' },
        { enName: 'cookie', ruName:'Имбирное печенье', price: '33000' },
        { enName: 'syrup', ruName:'Сироп в ассортименте', price: '169000' },
        { enName: 'cuptogo', ruName:'Кружка to go', price: '260000' },
        { enName: 'coloring', ruName:'Раскраска', price: '65000' },
        { enName: 'wine', ruName:'Кружка для глинтвейна', price: '78000' },
        { enName: 'spices', ruName:'Специи в мешочке', price: '52000' },
        { enName: 'cinnamon', ruName:'Палочки корицы', price: '26000' }

    ];


    
    var boxes = [
        { enName: 'GiftMe Colours',
          section: '<a href="#large_boxes">Large</a>',
          price:450000,
          productNames:['notebook', 'ball', 'cuptogo', 'coloring'] },
        { enName: 'GiftMe Cheers',
          section: '<a href="#large_boxes">Large</a>',
          price:450000,
          productNames:['honey', 'cookie', 'wine', 'spices'] },  
        { enName: 'GiftMe Smells',
          section: '<a href="#large_boxes">Large</a>',
          price:450000,
          productNames:['tea', 'honey', 'cookie', 'syrup'] },
        { enName: 'GiftMe Tea',
          section: '<a href="#medium_boxes">Medium</a>',
          price:250000,
          productNames:['cupwhite', 'honey', 'tea'] },
        { enName: 'GiftMe Profit',
          section: '<a href="#medium_boxes">Medium</a>',
          price:300000,
          productNames:['cupwhite', 'notebook', 'cardholder'] },
        { enName: 'GiftMe Relax',
          section: '<a href="#medium_boxes">Medium</a>',
          price:250000,
          productNames:['tea', 'ball', 'sleepmask'] },
        { enName: 'GiftMe Coffee',
          section: '<a href="#medium_boxes">Medium</a>',
          price:300000,
          productNames:['tea', 'cookie', 'syrup'] },
        { enName: 'GiftMe Sweet',
          section: '<a href="#small_boxes">Small</a>',
          price:59000,
          productNames:['sweet'] },          
        { enName: 'GiftMe Pin',
          section: '<a href="#small_boxes">Small</a>',
          price:79000,
          productNames:['toy'] }, 
        { enName: 'GiftMe Light',
          section: '<a href="#small_boxes">Small</a>',
          price:109000,
          productNames:['candle'] }    

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


    function matchBox () {
        var matchedPrice = 0;

        var matchedBoxEnName = '',
            matchedBoxSection = '';

        var selectedProductNames = $('input[type="checkbox"]:checked').map(function(index, checkbox){
            return checkbox.name;
        }).toArray();

        var isBoxMatched = false;

        boxes.forEach(function(box){
            var stringifySelectedProductNames = selectedProductNames.sort().toString(),
                stringifyBoxProductNames = box.productNames.sort().toString();
                
            if (stringifySelectedProductNames === stringifyBoxProductNames){
                matchedPrice = box.price;
                isBoxMatched = true;
                matchedBoxEnName = box.enName;
                matchedBoxSection = box.section;
            };
        }); 

        return { isBoxMatched: isBoxMatched, price: matchedPrice, boxEnName: matchedBoxEnName, boxSection: matchedBoxSection };
    
    }


      
    function calculateTotalPrice() {
        var price = 0,
            matchedBox = matchBox();

        if (matchedBox.isBoxMatched) {
            return matchedBox.price
        };


        $('input[type="checkbox"]:checked').each(function(index, checkbox) {
            var productPrice = parseInt(checkbox.value);
            price += productPrice;
        });
        price = price + 35000;
        return price;
    };




    function reloadTotalPrice() {
        var totalPrice = calculateTotalPrice(),
            priceBlock = $('#totalPrice'),
            matchedBox = matchBox();

        if (matchedBox.isBoxMatched){
            priceBlock.html('Данный набор вы можете найти в разделе '+ matchedBox.boxSection + ', под названием ' + matchedBox.boxEnName + '. Его стоимость ' + totalPrice + ' BYR');
        } else if (totalPrice) {
            priceBlock.html('Стоимость вашей коробки ' + totalPrice + ' BYR');
        } else {
            priceBlock.html('Выберите продукты')
        }
        
    }

    reloadTotalPrice();

    $('input[type="checkbox"]').click(reloadTotalPrice);
});
