package be.xzan.magicsquare.common

class Controller {

    var score = 1
        private set
    private var last = 0
    lateinit private var array: IntArray
    lateinit private var next: List<Int>

    init {
        reset()
    }

    fun reset() {
        score = 1
        last = 0
        array = IntArray(100)
        array[0] = score
        next = getNextForPosition(last)
    }

    fun getNextForPosition(position: Int) = getNextForPosition(array, position)

    internal fun getNextForPosition(array: IntArray, position: Int): List<Int> = mutableListOf<Int>().apply {
        val col = position % 10
        val row = position / 10
        // region vertical
        if (row > 2) {
            addIfPositionEmpty(array, position - 30)
        }
        if (row < 7) {
            addIfPositionEmpty(array, position + 30)
        }
        // endregion vertical
        // region horizontal
        if (col > 2) {
            addIfPositionEmpty(array, position - 3)
        }
        if (col < 7) {
            addIfPositionEmpty(array, position + 3)
        }
        // endregion horizontal
        // region left to right diagonal
        if (row > 0 && col > 1 && position > 21) {
            addIfPositionEmpty(array, position - 22)
        }
        if (row < 9 && col < 8 && position < 78) {
            addIfPositionEmpty(array, position + 22)
        }
        // endregion left to right diagonal
        // region right to left diagonal
        if (col < 8 && row > 0 && position > 17) {
            addIfPositionEmpty(array, position - 18)
        }
        if (col > 1 && row < 9 && position < 82) {
            addIfPositionEmpty(array, position + 18)
        }
        // endregion right to left diagonal
    }

    private fun MutableList<Int>.addIfPositionEmpty(array: IntArray, position: Int) {
        if (array[position].isNotSelected) {
            add(position)
        }
    }

    fun isPositionValidAsNext(position: Int) = isPositionValidAsNext(position, next)

    internal fun isPositionValidAsNext(position: Int, next: List<Int>) = position in next

    fun setAsNext(position: Int) = setAsNext(position, next)

    internal fun setAsNext(position: Int, next: List<Int>) =
            if (isPositionValidAsNext(position, next)) {

                array[position] = ++score
                last = position
                this.next = getNextForPosition(last)
                true
            } else {
                false
            }

    fun isLast(i: Int) = i == last

    fun valueForPosition(i: Int) = array[i]

    fun hasNextMove() = next.isNotEmpty()

    private val Int.isNotSelected: Boolean
        get() = this == 0
}