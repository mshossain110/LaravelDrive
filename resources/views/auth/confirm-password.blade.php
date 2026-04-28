<x-guest-layout>
    <div class="auth-card">
        <!-- Icon -->
        <div class="auth-icon">
            <div class="auth-icon-circle">
                <svg viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
            </div>
        </div>

        <h1 class="auth-title">Confirm password</h1>
        <p class="auth-description">
            This is a secure area. Please confirm your password before continuing.
        </p>

        <!-- Validation Errors -->
        @if ($errors->any())
            <div class="auth-alert error">
                @foreach ($errors->all() as $error)
                    <div>{{ $error }}</div>
                @endforeach
            </div>
        @endif

        <form method="POST" action="{{ route('password.confirm') }}">
            @csrf

            <!-- Password -->
            <div class="form-group">
                <label class="form-label" for="password">Password</label>
                <input id="password" class="form-input" type="password" name="password"
                       required autocomplete="current-password"
                       placeholder="Enter your password" />
            </div>

            <button type="submit" class="btn-primary">Confirm</button>
        </form>
    </div>
</x-guest-layout>
