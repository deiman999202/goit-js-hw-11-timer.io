const refs = {
    timerInterface: document.getElementById("timer-1"),
    daysUntilEndOfDiscount: document.getElementById("end-of-the-discount")
}

/*
 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
 */






class Timer {


    constructor(targetTime) {
        this.targetTime = new Date(targetTime)
    }

    start() {
        const unixTargetTime = Date.parse(this.targetTime)
        refs.daysUntilEndOfDiscount.textContent = `The discount will end on ${formatDate(this.targetTime)}`
        setInterval(() => {
            const currentTime = Date.now()
            const deltaTime = (unixTargetTime - currentTime)
            const {days, hours, mins, secs} = getTimeComponents(deltaTime)
            updateClockface({days, hours, mins, secs})
        }, 1000)
    }

}

const timer = new Timer('Jul 25, 2021 12:00')

timer.start()

function updateClockface({ days, hours, mins, secs }) {
    refs.timerInterface.textContent = `${days}:${hours}:${mins}:${secs}`
}

function pad(value) {
    return String(value).padStart(2, '0')
}

function getTimeComponents(time) {

    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    /*
 * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
 * остатка % и делим его на количество миллисекунд в одном часе
 * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
 */
const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

/*
 * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
 */
const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

/*
 * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
 * миллисекунд в одной секунде (1000)
 */
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
    
    return {days, hours, mins, secs}
}

function formatDate(date)
    {
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();

      return mm + '/' + dd + '/' + yyyy;
    }



