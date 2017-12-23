package be.xzan.magicsquare.main.injections

import android.content.Context
import be.xzan.magicsquare.Application
import dagger.BindsInstance
import dagger.Component
import dagger.android.AndroidInjectionModule
import javax.inject.Singleton

@Component(modules = [MainModule::class, AndroidInjectionModule::class])
@Singleton
interface AppComponent {

    @Component.Builder
    interface Builder {
        fun build(): AppComponent
        @BindsInstance
        fun context(context: Context): Builder
    }

    fun inject(application: Application)
}