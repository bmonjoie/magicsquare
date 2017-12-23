package be.xzan.magicsquare.main.presenters

import be.xzan.magicsquare.common.Controller
import be.xzan.magicsquare.main.managers.BestScoreManager
import be.xzan.magicsquare.main.views.MagicSquareView

class Presenter(
        private val controller: Controller,
        private val bestScoreManager: BestScoreManager
) {
    private val data = ControllerWrapper(controller)
    private var view: View? = null

    fun attach(view: View) {
        this.view = view
        view.setData(data)
        updateView()
    }

    fun detach() {
        view = null
    }

    fun onCellClicked(position: Int) {
        if (controller.isPositionValidAsNext(position)) {
            controller.setAsNext(position)
            if (!controller.hasNextMove()) {
                if (bestScoreManager.score < controller.score) {
                    bestScoreManager.score = controller.score
                }
                view?.showGameOver(controller.score)
            }
            updateView()
        }
    }

    fun restart() {
        controller.reset()
        updateView()
    }

    private fun updateView() {
        view?.refreshDisplay()
        view?.updateScore(controller.score, bestScoreManager.score)
    }

    interface View {
        fun setData(data: MagicSquareView.Data)
        fun refreshDisplay()
        fun showGameOver(score: Int)
        fun updateScore(currentScore: Int, bestScore: Int)
    }

    class ControllerWrapper(private val controller: Controller) : MagicSquareView.Data {
        override fun isLast(position: Int) = controller.isLast(position)

        override fun isPositionValidAsNext(position: Int) = controller.isPositionValidAsNext(position)

        override fun valueForPosition(position: Int) = controller.valueForPosition(position)

        override val count = 100
    }
}