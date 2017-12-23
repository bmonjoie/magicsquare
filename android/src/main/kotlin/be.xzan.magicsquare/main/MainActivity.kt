package be.xzan.magicsquare.main

import android.content.Intent
import android.os.Bundle
import android.support.v7.app.AlertDialog
import android.support.v7.app.AppCompatActivity
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.AdapterView
import android.widget.TextView
import be.xzan.magicsquare.R
import be.xzan.magicsquare.about.AboutActivity
import be.xzan.magicsquare.main.presenters.Presenter
import be.xzan.magicsquare.main.views.MagicSquareView
import dagger.android.AndroidInjection
import javax.inject.Inject

class MainActivity : AppCompatActivity(), Presenter.View, AdapterView.OnItemClickListener {

    @Inject
    lateinit var presenter: Presenter

    private lateinit var magicSquare: MagicSquareView
    private lateinit var tvScore: TextView
    private lateinit var tvBestScore: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        AndroidInjection.inject(this)
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        magicSquare = findViewById(R.id.magic_square)
        tvScore = findViewById(R.id.tv_score)
        tvBestScore = findViewById(R.id.tv_best_score)
        magicSquare.onItemClickListener = this
        presenter.attach(this)
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.main, menu)
        return super.onCreateOptionsMenu(menu)
    }

    override fun onOptionsItemSelected(item: MenuItem) = when (item.itemId) {
        R.id.restart -> onRestartClicked()
        R.id.help -> showHelp()
        R.id.about -> showAbout()
        else -> super.onOptionsItemSelected(item)
    }

    private fun onRestartClicked(): Boolean {
        AlertDialog.Builder(this)
                .setTitle(R.string.restart)
                .setMessage(R.string.restart_confirm_message)
                .setPositiveButton(R.string.yes, { _, _ -> presenter.restart() })
                .setNegativeButton(R.string.no, null)
                .show()
        return true
    }

    private fun showHelp(): Boolean {
        AlertDialog.Builder(this)
                .setTitle(R.string.help)
                .setMessage(R.string.help_message)
                .setPositiveButton(R.string.ok, null)
                .show()
        return true
    }

    private fun showAbout(): Boolean {
        Intent(this, AboutActivity::class.java).run {
            startActivity(this)
        }
        return true
    }

    override fun onItemClick(parent: AdapterView<*>, v: View, position: Int, id: Long)
            = presenter.onCellClicked(position)

    override fun onDestroy() {
        presenter.detach()
        super.onDestroy()
    }

    override fun setData(data: MagicSquareView.Data) {
        magicSquare.data = data
    }

    override fun refreshDisplay() = magicSquare.invalidateViews()

    override fun updateScore(currentScore: Int, bestScore: Int) {
        tvScore.text = currentScore.toString()
        tvBestScore.text = if (bestScore > 1) bestScore.toString() else ""
    }

    override fun showGameOver(score: Int) {
        AlertDialog.Builder(this)
                .setTitle(R.string.game_over)
                .setMessage(getString(R.string.game_over_message, score))
                .setPositiveButton(R.string.ok, null)
                .show()
    }
}