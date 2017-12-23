package be.xzan.magicsquare

import android.app.Activity
import be.xzan.magicsquare.main.injections.DaggerAppComponent
import dagger.android.DispatchingAndroidInjector
import dagger.android.HasActivityInjector
import javax.inject.Inject
import android.app.Application as BaseApplication


class Application : BaseApplication(), HasActivityInjector {

    @Inject
    lateinit var dispatchingActivityInjector: DispatchingAndroidInjector<Activity>

    override fun onCreate() {
        super.onCreate()
        DaggerAppComponent.builder().context(this).build().inject(this)
    }

    override fun activityInjector() = dispatchingActivityInjector
}