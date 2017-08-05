package be.xzan.magicsquare

class Controller {

    var score = 1
        private set
    private var last = 0
    lateinit private var array : IntArray
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

    fun getNextForPosition(position: Int) = mutableListOf<Int>().apply {
        val col = position % 10
        val row = position / 10
        // region vertical
        if (row > 2) {
            addIfPositionEmpty(position - 30)
        }
        if (row < 7) {
            addIfPositionEmpty(position + 30)
        }
        // endregion vertical
        // region horizontal
        if (col > 2) {
            addIfPositionEmpty(position - 3)
        }
        if (col < 7) {
            addIfPositionEmpty(position + 3)
        }
        // endregion horizontal
        // region left to right diagonal
        if (row > 1 && col > 1) {
            addIfPositionEmpty(position - 22)
        }
        if (row < 8 && col < 8) {
            addIfPositionEmpty(position + 22)
        }
        // endregion left to right diagonal
        // region right to left diagonal
        if (row < 8 && col < 8) {
            addIfPositionEmpty(position - 18)
        }
        if (row > 1 && col > 1) {
            addIfPositionEmpty(position + 18)
        }
        // endregion right to left diagonal
    }

    private fun MutableList<Int>.addIfPositionEmpty(position: Int) {
        if (array[position].isNotSelected) {
            add(position)
        }
    }

    fun isPositionValidAsNext(position: Int) = position in next

    fun setAsNext(position: Int) = if (isPositionValidAsNext(position)) {
        array[position] = ++score
        last = position
        next = getNextForPosition(last)
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