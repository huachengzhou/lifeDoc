var wizardContent;
var numberOfSteps;
function FormWizardInit(obj, nextFn,fn) {
    wizardContent = $("#" + obj);
    wizardContent.smartWizard({
        selected: 0,
        keyNavigation: false,
        onLeaveStep: leaveAStepCallback,
         onShowStep: onShowStep(nextFn,fn)
    });
    animateBar();//设置进度显示
}
function leaveAStepCallback(obj, context) {
    return validateSteps(context.fromStep, context.toStep);
}
function animateBar(val) {
    if ((typeof val == 'undefined') || val == "") {
        val = 1;
    }
    numberOfSteps = $('.swMain > ul > li').length;
    var valueNow = Math.floor(100 / numberOfSteps * val);
    $('.step-bar').css('width', valueNow + '%');
}

function onShowStep(nextFn, fn) {
    $(".next-step").unbind("click").click(function (e) {
        e.preventDefault();
        if (nextFn()) {
            wizardContent.smartWizard("goForward");
        }

    });
    $(".back-step").unbind("click").click(function (e) {
        e.preventDefault();
        wizardContent.smartWizard("goBackward");
    });
    $(".finish-step").unbind("click").click(function (e) {
        e.preventDefault();
        fn();
    });
}

function validateSteps(stepnumber, nextstep) {
    if (numberOfSteps > nextstep && nextstep > stepnumber) {
        animateBar(nextstep);
        return true;
    } else if (nextstep < stepnumber) {
        $('.anchor').children("li:nth-child(" + stepnumber + ")").children("a").addClass('wait');
        animateBar(nextstep);
        return true;
    } else {
        $('.anchor').children("li:nth-child(" + stepnumber + ")").children("a").removeClass('wait');

        animateBar(nextstep);
        return true;
    }
}