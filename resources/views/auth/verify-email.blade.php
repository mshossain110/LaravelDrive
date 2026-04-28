<x-guest-layout>
    <div class="auth-card">
        <!-- Icon -->
        <div class="auth-icon">
            <div class="auth-icon-circle">
                <svg viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
            </div>
        </div>

        <h1 class="auth-title">Verify your email</h1>
        <p class="auth-description">
            Thanks for signing up! Please verify your email address by clicking the link we just sent you.
            If you didn't receive the email, we'll gladly send you another.
        </p>

        @if (session('status') == 'verification-link-sent')
            <div class="auth-alert success">
                A new verification link has been sent to your email address.
            </div>
        @endif

        <div class="auth-actions">
            <form method="POST" action="{{ route('verification.send') }}">
                @csrf
                <button type="submit" class="btn-primary">Resend Verification Email</button>
            </form>

            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <button type="submit" class="btn-text">Log out</button>
            </form>
        </div>
    </div>
</x-guest-layout>
