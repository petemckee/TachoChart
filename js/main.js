//-- Chart elements
let $valBase = document.querySelector('.js-val-base');
let $valMax = document.querySelector('.js-val-max');
let $valResult = document.querySelector('.js-val-result');
let $needle = document.querySelector('.js-needle');
let $needleVal = document.querySelector('.js-needle-val');

//-- Chart value and label inputs
var $chartMinVal = document.getElementById('ChartMinVal');
var $chartMinValLabel = document.getElementById('ChartMinValLabel');

var $chartMaxVal = document.getElementById('ChartMaxVal');
var $chartMaxValLabel = document.getElementById('ChartMaxValLabel');

var $chartActualVal = document.getElementById('ChartActualVal');
var $chartActualValLabel = document.getElementById('ChartActualValLabel');

//-- Chart settings
let $maxoutNeedle = document.getElementById('MaxoutNeedle');
let $formatChartLabels = document.getElementById('FormatChartLabels');

//-- Export settings
let $exportContainer = document.getElementById('ExportContainer');
let $exportImage = document.getElementById('ExportImage');



document.querySelector('.js-create').addEventListener('click', function() {

    calculate();

});

//-- Place needle in corect position based on values
function calculate()
{
    var maxDivisible = (180 / $chartMaxVal.value);
    var total = $chartActualVal.value * maxDivisible;

    if (total > 185 && $maxoutNeedle.checked)
    {
        total = 185;
    }

    $needle.style = `transform: rotate(${total}deg)`;
    $needleVal.style = `transform: rotate(-${total}deg)`;

}

//-- Open export modal ready to save image
document.querySelector('.js-export').addEventListener('click', function() {

    //-- Separate/parent element required as overflow:hidden makes image include hidden content
    var $chartNode = document.getElementById('ChartExportContainer');

    domtoimage.toPng($chartNode)
    .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        $exportImage.src = dataUrl;
        $exportContainer.classList.add('--active');
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });

});

//-- Close export modal
document.querySelector('.js-close').addEventListener('click', function() {
    $exportContainer.classList.remove('--active');
});


//-- Set event listeners for chart values/labels
function handleValsAndLabels($val, $label, $display)
{

    $val.addEventListener('blur', function() {
        $display.textContent = ($label.value == '') ? $val.value : $label.value;

        if ($label.value == '') {
            $label.value = $display.textContent;
        }
    });

    $label.addEventListener('blur', function() {
        $display.textContent = ($label.value == '') ? $val.value : $label.value;
    });

}

handleValsAndLabels($chartMinVal, $chartMinValLabel, $valBase);
handleValsAndLabels($chartMaxVal, $chartMaxValLabel, $valMax);
handleValsAndLabels($chartActualVal, $chartActualValLabel, $valResult);