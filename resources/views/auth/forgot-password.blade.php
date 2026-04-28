<x-guest-layout>
    <div class="auth-card">
        <!-- Icon -->
        <div class="auth-icon">
            <div class="auth-icon-circle">
                <svg viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                </svg>
            </div>
        </div>

        <h1 class="auth-title">Forgot password?</h1>
        <p class="auth-subtitle">No worries. Enter your email and we'll send you a reset link.</p>

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

        <form method="POST" action="{{ route('password.email') }}">
            @csrf

            <!-- Email Address -->
            <div class="form-group">
                <label class="form-label" for="email">Email address</label>
                <input id="email" class="form-input" type="email" name="email"
                       value="{{ old('email') }}" required autofocus
                       placeholder="you@example.com" />
            </div>

            <button type="submit" class="btn-primary">Send Reset Link</button>
        </form>

        <p class="auth-footer">
            Remember your password?
            <a class="auth-link" href="{{ route('login') }}">Back to sign in</a>
        </p>
    </div>
</x-guest-layout>
