<x-guest-layout>
    <div class="auth-card">
        <!-- Logo -->
        <div class="auth-logo">
            <a href="/">
                <x-application-logo />
            </a>
        </div>

        <h1 class="auth-title">Welcome back</h1>
        <p class="auth-subtitle">Sign in to continue to {{ config('app.name') }}</p>

        <!-- Session Status -->
        @if (session('status'))
            <div class="auth-alert success">{{ session('status') }}</div>
        @endif

        <!-- Validation Errors -->
        @if ($errors->any())
            <div class="auth-alert error">
                @foreach ($errors->all() as $error)
                    <div>{{ $error }}</div>
                @endforeach
            </div>
        @endif

        <form method="POST" action="{{ route('login') }}">
            @csrf

            <!-- Email -->
            <div class="form-group">
                <label class="form-label" for="email">Email address</label>
                <input id="email" class="form-input" type="email" name="email"
                       value="{{ old('email') }}" required autofocus
                       placeholder="you@example.com" />
            </div>

            <!-- Password -->
            <div class="form-group">
                <label class="form-label" for="password">Password</label>
                <input id="password" class="form-input" type="password" name="password"
                       required autocomplete="current-password"
                       placeholder="Enter your password" />
            </div>

            <!-- Remember me / Forgot password -->
            <div class="form-row">
                <label class="form-check" for="remember_me">
                    <input id="remember_me" type="checkbox" name="remember">
                    Remember me
                </label>
                @if (Route::has('password.request'))
                    <a class="auth-link" href="{{ route('password.request') }}">Forgot password?</a>
                @endif
            </div>

            <button type="submit" class="btn-primary">Sign in</button>
        </form>

        <p class="auth-footer">
            Don't have an account?
            <a class="auth-link" href="{{ route('register') }}">Create one</a>
        </p>
    </div>
</x-guest-layout>
