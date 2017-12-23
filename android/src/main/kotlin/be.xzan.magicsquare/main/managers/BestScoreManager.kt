package be.xzan.magicsquare.main.managers

import android.content.Context

class BestScoreManager(context: Context) {

    private val sharedPrefs = context.getSharedPreferences(SHARED_PREFS_NAME, Context.MODE_PRIVATE)

    var score: Int = -1
        get() {
            if (field == -1) {
                field = sharedPrefs.getInt(BEST_SCORE_NAME, DEFAULT_BEST_SCORE)
            }
            return field
        }
        set(value) {
            sharedPrefs.edit().putInt(BEST_SCORE_NAME, value).apply()
            field = value
        }

    companion object {
        private const val SHARED_PREFS_NAME = "best_score_prefs"
        private const val BEST_SCORE_NAME = "best_score"
        private const val DEFAULT_BEST_SCORE = 1
    }
}