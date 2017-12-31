package be.xzan.magicsquare.main.views

import android.content.Context
import android.graphics.Color
import android.util.AttributeSet
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.GridView
import android.widget.TextView
import be.xzan.magicsquare.R


class MagicSquareView @JvmOverloads constructor(
        context: Context,
        attrs: AttributeSet? = null,
        defStyleAttr: Int = 0
) : GridView(context, attrs, defStyleAttr) {

    init {
        numColumns = 10
        stretchMode = STRETCH_COLUMN_WIDTH
    }

    var data: Data? = null
        set(value) {
            field = value
            adapter = if (value != null) {
                Adapter(context, value)
            } else {
                null
            }
        }

    class Adapter(
            context: Context,
            private val data: Data
    ) : ArrayAdapter<Int>(context, 0) {

        override fun getView(position: Int, convertView: View?, parent: ViewGroup?)
                = getView(convertView, parent).apply {
            val value = getItem(position)
            text = if (value != 0) value.toString() else ""
            val (backgroundRes, textColor) = when {
                data.isLast(position) -> R.drawable.item_cell_bg_last to Color.WHITE
                value != 0 -> R.drawable.item_cell_bg_filled to Color.BLACK
                data.isPositionValidAsNext(position) -> R.drawable.item_cell_bg_next to Color.BLACK
                else -> R.drawable.item_cell_bg to Color.BLACK
            }
            setBackgroundResource(backgroundRes)
            setTextColor(textColor)
        }

        private fun getView(convertView: View?, parent: ViewGroup?) = convertView as TextView? ?:
                LayoutInflater.from(context).inflate(R.layout.item_cell, parent, false) as TextView

        override fun getItemId(position: Int) = position.toLong()
        override fun getItem(position: Int) = data.valueForPosition(position)
        override fun getCount() = data.count
    }

    interface Data {
        fun isLast(position: Int): Boolean
        fun isPositionValidAsNext(position: Int): Boolean
        fun valueForPosition(position: Int): Int
        val count: Int
    }
}