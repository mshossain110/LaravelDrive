<x-guest-layout>
    <div class="auth-card">
        <!-- Logo -->
        <div class="auth-logo">
            <a href="/">
                <x-application-logo />
            </a>
        </div>

        <h1 class="auth-title">Create your account</h1>
        <p class="auth-subtitle">Get started with {{ config('app.name') }} for free</p>

        <!-- Validation Errors -->
        @if ($errors->any())
            <div class="auth-alert error">
                @foreach ($errors->all() as $error)
                    <div>{{ $error }}</div>
                @endforeach
            </div>
        @endif

        <form method="POST" action="{{ route('register') }}">
            @csrf

            <!-- Name -->
            <div class="form-group">
                <label class="form-label" for="name">Full name</label>
                <input id="name" class="form-input" type="text" name="name"
                       value="{{ old('name') }}" required autofocus
                       placeholder="John Doe" />
            </div>

            <!-- Email -->
            <div class="form-group">
                <label class="form-label" for="email">Email address</label>
                <input id="email" class="form-input" type="email" name="email"
                       value="{{ old('email') }}" required
                       placeholder="you@example.com" />
            </div>

            <!-- Password -->
            <div class="form-group">
                <label class="form-label" for="password">Password</label>
                <input id="password" class="form-input" type="password" name="password"
                       required autocomplete="new-password"
                       placeholder="Create a password" />
            </div>

            <!-- Confirm Password -->
            <div class="form-group">
                <label class="form-label" for="password_confirmation">Confirm password</label>
                <input id="password_confirmation" class="form-input" type="password"
                       name="password_confirmation" required
                       placeholder="Confirm your password" />
            </div>

            <button type="submit" class="btn-primary">Create Account</button>
        </form>

        <p class="auth-footer">
            Already have an account?
            <a class="auth-link" href="{{ route('login') }}">Sign in</a>
        </p>
    </div>
</x-guest-layout>
