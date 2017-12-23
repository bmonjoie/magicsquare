package be.xzan.magicsquare.about

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import be.xzan.magicsquare.BuildConfig
import be.xzan.magicsquare.R
import mehdi.sakout.aboutpage.AboutPage
import mehdi.sakout.aboutpage.Element


class AboutActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val aboutPage = AboutPage(this)
                .setDescription(getString(R.string.about_page_description))
                .setImage(R.mipmap.ic_launcher)
                .addGroup(getString(R.string.libraries_used_title))
                .apply {
                    LIBRARIES.asSequence()
                            .map {
                                Element().apply {
                                    title = it.key
                                    intent = Intent(Intent.ACTION_VIEW).apply {
                                        data = it.value
                                    }
                                }
                            }
                            .forEach {
                                addItem(it)
                            }
                }
                .addGroup(getString(R.string.connect_with_us))
                .addEmail("bmo@appkers.com")
                .addTwitter("Xzan")
                .addPlayStore(BuildConfig.APPLICATION_ID)
                .addGitHub("bmonjoie/magicsquare")
                .create()

        setContentView(aboutPage)
    }

    companion object {
        private val LIBRARIES = mapOf<String, Uri>(
                "Android About Page" to Uri.parse("https://github.com/medyo/android-about-page"),
                "AppCompat" to Uri.parse("https://developer.android.com/topic/libraries/support-library/features.html"),
                "ConstraintLayout" to Uri.parse("https://developer.android.com/reference/android/support/constraint/ConstraintLayout.html"),
                "Dagger 2" to Uri.parse("https://github.com/google/dagger"),
                "Kotlin" to Uri.parse("https://github.com/jetbrains/kotlin")
        )
    }
}