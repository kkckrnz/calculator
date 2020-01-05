const buttonColor = document.querySelectorAll('button');
buttons.forEach(buttonColor => {
    if (buttonColor.value === 'clear' || buttonColor.value === 'undo') {
        buttonColor.style.backgroundColor = '#525252';
    } else if (buttonColor.value === '+' ||
        buttonColor.value === '-' ||
        buttonColor.value === '*' ||
        buttonColor.value === '/' ||
        buttonColor.value === '=') {
            buttonColor.style.backgroundColor = '#ff6f00';
    } else {
        buttonColor.style.backgroundColor = '#a3a3a3';
    }
})