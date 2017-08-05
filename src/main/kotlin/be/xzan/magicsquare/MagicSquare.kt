package be.xzan.magicsquare

import org.w3c.dom.HTMLInputElement
import org.w3c.dom.HTMLSpanElement
import org.w3c.dom.HTMLTableCellElement
import org.w3c.dom.get
import kotlin.browser.document
import kotlin.dom.addClass
import kotlin.dom.removeClass

class MagicSquare {

    private val logic = Controller()
    private val elements = document.getElementsByTagName("td")
    private val restart = document.getElementById("restart")  as HTMLInputElement
    private val score = document.getElementById("current_score")  as HTMLSpanElement
    private val best = document.getElementById("best_score")  as HTMLSpanElement
    private val cheatToggle = document.getElementById("cheat") as HTMLInputElement
    private var cheat = false
    private var nextCheat: List<Int>? = null

    init {
        for (i in 0 until elements.length) {
            elements[i]?.addEventListener("click", {
                onElementClicked(i)
            }, true)
            elements[i]?.addEventListener("mouseover", {
                onElementHover(i)
            }, true)
        }
        restart.addEventListener("click", {
            onRestartClicked()
        }, true)
        cheatToggle.addEventListener("click", {
            onCheatToggle()
        }, true)
    }

    private fun onElementClicked(position: Int) {
        if (logic.setAsNext(position)) {
            nextCheat = null
            display()
            if (!logic.hasNextMove()) {
                if (logic.score == 100) {
                    js("alert('You won !')")
                }
                best.textContent = logic.score.toString()
            }
        }
    }

    private fun onElementHover(position: Int) {
        if (cheat) {
            if (logic.isPositionValidAsNext(position)) {
                nextCheat = logic.getNextForPosition(position)
            } else {
                nextCheat = null
            }
            display()
        }
    }

    private fun onRestartClicked() {
        logic.reset()
        display()
    }

    private fun onCheatToggle() {
        cheat = cheatToggle.checked
        if (!cheat) {
            nextCheat = null
            display()
        }
    }

    fun display() {
        score.textContent = logic.score.toString()
        for (i in 0 until elements.length) {
            with(elements[i] as HTMLTableCellElement) {
                // region reset cell
                textContent = ""
                removeClass(NEXT)
                removeClass(CHEAT)
                removeClass(FILLED)
                removeClass(LAST)
                // endregion reset cell

                if (logic.isPositionValidAsNext(i)) {
                    addClass(NEXT)
                }

                nextCheat?.let {
                    if (i in it) {
                        addClass(CHEAT)
                    }
                }
                val position = logic.valueForPosition(i)
                if (position != 0) {
                    textContent = position.toString()
                    addClass(FILLED)
                    if (logic.isLast(i)) {
                        addClass(LAST)
                    }
                }
            }
        }
    }

    companion object {
        const val LAST = "last"
        const val FILLED = "filled"
        const val NEXT = "next"
        const val CHEAT = "cheat"
    }

}