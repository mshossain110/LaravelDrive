<x-guest-layout>
    <div class="auth-card">
        <!-- Icon -->
        <div class="auth-icon">
            <div class="auth-icon-circle">
                <svg viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
            </div>
        </div>

        <h1 class="auth-title">Set new password</h1>
        <p class="auth-subtitle">Your new password must be different from previously used passwords.</p>

        <!-- Validation Errors -->
        @if ($errors->any())
            <div class="auth-alert error">
                @foreach ($errors->all() as $error)
                    <div>{{ $error }}</div>
                @endforeach
            </div>
        @endif

        <form method="POST" action="{{ route('password.update') }}">
            @csrf

            <!-- Password Reset Token -->
            <input type="hidden" name="token" value="{{ $request->route('token') }}">

            <!-- Email Address -->
            <div class="form-group">
                <label class="form-label" for="email">Email address</label>
                <input id="email" class="form-input" type="email" name="email"
                       value="{{ old('email', $request->email) }}" required autofocus
                       placeholder="you@example.com" />
            </div>

            <!-- Password -->
            <div class="form-group">
                <label class="form-label" for="password">New password</label>
                <input id="password" class="form-input" type="password" name="password"
                       required placeholder="Enter new password" />
            </div>

            <!-- Confirm Password -->
            <div class="form-group">
                <label class="form-label" for="password_confirmation">Confirm new password</label>
                <input id="password_confirmation" class="form-input" type="password"
                       name="password_confirmation" required
                       placeholder="Confirm new password" />
            </div>

            <button type="submit" class="btn-primary">Reset Password</button>
        </form>

        <p class="auth-footer">
            <a class="auth-link" href="{{ route('login') }}">Back to sign in</a>
        </p>
    </div>
</x-guest-layout>
