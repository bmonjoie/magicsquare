package be.xzan.magicsquare.main.injections

import android.content.Context
import be.xzan.magicsquare.common.Controller
import be.xzan.magicsquare.main.MainActivity
import be.xzan.magicsquare.main.managers.BestScoreManager
import be.xzan.magicsquare.main.presenters.Presenter
import dagger.Module
import dagger.Provides
import dagger.android.ContributesAndroidInjector
import javax.inject.Singleton

@Module
abstract class MainModule {

    @ContributesAndroidInjector
    abstract fun mainActivity(): MainActivity

    @Module
    companion object {
        @JvmStatic
        @Provides
        @Singleton
        fun provideController() = Controller()

        @JvmStatic
        @Provides
        @Singleton
        fun provideBestScoreManager(context: Context) = BestScoreManager(context)

        @JvmStatic
        @Provides
        @Singleton
        fun providePresenter(controller: Controller, bestScoreManager: BestScoreManager) = Presenter(controller, bestScoreManager)
    }
}