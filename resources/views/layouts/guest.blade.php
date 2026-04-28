<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

        <!-- Styles -->
        @vite(['resources/css/app.css'])

        <style>
            *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

            body {
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Inter', system-ui, -apple-system, sans-serif;
                background: #0f0a1a;
                overflow-x: hidden;
                position: relative;
            }

            body::before {
                content: '';
                position: fixed;
                inset: 0;
                background:
                    radial-gradient(ellipse 60% 50% at 20% 20%, rgba(139, 92, 246, 0.15), transparent),
                    radial-gradient(ellipse 50% 40% at 80% 80%, rgba(168, 85, 247, 0.1), transparent),
                    radial-gradient(ellipse 40% 30% at 50% 50%, rgba(192, 132, 252, 0.05), transparent);
                pointer-events: none;
                z-index: 0;
            }

            /* ---- Card ---- */
            .auth-card {
                position: relative;
                z-index: 1;
                background: rgba(255, 255, 255, 0.04);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.08);
                width: 100%;
                max-width: 440px;
                border-radius: 24px;
                padding: 44px 40px 40px;
                margin: 24px;
                box-shadow:
                    0 0 0 1px rgba(139, 92, 246, 0.05),
                    0 25px 60px rgba(0, 0, 0, 0.4),
                    0 0 120px rgba(139, 92, 246, 0.06);
            }

            /* ---- Logo ---- */
            .auth-logo {
                display: flex;
                justify-content: center;
                margin-bottom: 32px;
            }

            .auth-logo a {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 56px;
                height: 56px;
                border-radius: 16px;
                background: linear-gradient(135deg, #8b5cf6, #a855f7);
                box-shadow: 0 8px 24px rgba(139, 92, 246, 0.35);
                transition: transform 0.2s;
            }

            .auth-logo a:hover { transform: scale(1.05); }

            .auth-logo svg {
                width: 28px;
                height: 28px;
                fill: #ffffff;
            }

            /* ---- Icon (for non-logo pages) ---- */
            .auth-icon {
                display: flex;
                justify-content: center;
                margin-bottom: 28px;
            }

            .auth-icon-circle {
                width: 64px;
                height: 64px;
                border-radius: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(168, 85, 247, 0.1));
                border: 1px solid rgba(139, 92, 246, 0.2);
            }

            .auth-icon-circle svg {
                width: 28px;
                height: 28px;
                stroke: #a78bfa;
                fill: none;
                stroke-width: 1.5;
                stroke-linecap: round;
                stroke-linejoin: round;
            }

            /* ---- Typography ---- */
            .auth-title {
                text-align: center;
                font-size: 24px;
                font-weight: 800;
                color: #f5f3ff;
                margin: 0 0 8px;
                letter-spacing: -0.3px;
            }

            .auth-subtitle {
                text-align: center;
                font-size: 14px;
                color: #a1a1aa;
                margin: 0 0 32px;
                line-height: 1.5;
            }

            /* ---- Alerts ---- */
            .auth-alert {
                border-radius: 12px;
                padding: 12px 16px;
                font-size: 13px;
                margin-bottom: 20px;
                line-height: 1.5;
            }

            .auth-alert.success {
                background: rgba(16, 185, 129, 0.1);
                border: 1px solid rgba(16, 185, 129, 0.2);
                color: #6ee7b7;
            }

            .auth-alert.error {
                background: rgba(239, 68, 68, 0.1);
                border: 1px solid rgba(239, 68, 68, 0.2);
                color: #fca5a5;
            }

            .auth-alert.info {
                background: rgba(139, 92, 246, 0.1);
                border: 1px solid rgba(139, 92, 246, 0.2);
                color: #c4b5fd;
            }

            /* ---- Form ---- */
            .form-group {
                margin-bottom: 20px;
            }

            .form-label {
                display: block;
                font-size: 13px;
                font-weight: 600;
                color: #d4d4d8;
                margin-bottom: 8px;
                letter-spacing: 0.2px;
            }

            .form-input {
                width: 100%;
                padding: 12px 16px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                font-size: 14px;
                font-family: 'Inter', system-ui, sans-serif;
                color: #f4f4f5;
                background: rgba(255, 255, 255, 0.05);
                outline: none;
                transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
            }

            .form-input::placeholder { color: #52525b; }

            .form-input:focus {
                border-color: rgba(139, 92, 246, 0.5);
                box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
                background: rgba(255, 255, 255, 0.07);
            }

            .form-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 24px;
                margin-top: 2px;
            }

            .form-check {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 13px;
                color: #a1a1aa;
                cursor: pointer;
            }

            .form-check input[type=checkbox] {
                accent-color: #8b5cf6;
                width: 16px;
                height: 16px;
                cursor: pointer;
                border-radius: 4px;
            }

            /* ---- Links ---- */
            .auth-link {
                font-size: 13px;
                color: #a78bfa;
                text-decoration: none;
                font-weight: 600;
                transition: color 0.15s;
            }

            .auth-link:hover { color: #c4b5fd; }

            /* ---- Buttons ---- */
            .btn-primary {
                width: 100%;
                padding: 13px;
                background: linear-gradient(135deg, #7c3aed, #8b5cf6, #a855f7);
                color: #fff;
                border: none;
                border-radius: 12px;
                font-size: 15px;
                font-weight: 700;
                font-family: 'Inter', system-ui, sans-serif;
                cursor: pointer;
                letter-spacing: 0.2px;
                box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
                transition: opacity 0.2s, transform 0.1s, box-shadow 0.2s;
                position: relative;
                overflow: hidden;
            }

            .btn-primary:hover {
                opacity: 0.92;
                box-shadow: 0 6px 28px rgba(139, 92, 246, 0.4);
            }
            .btn-primary:active { transform: scale(0.98); }

            .btn-secondary {
                display: inline-flex;
                align-items: center;
                padding: 10px 20px;
                background: rgba(255, 255, 255, 0.06);
                color: #d4d4d8;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                font-size: 14px;
                font-weight: 600;
                font-family: 'Inter', system-ui, sans-serif;
                cursor: pointer;
                transition: background 0.15s, border-color 0.15s;
            }

            .btn-secondary:hover {
                background: rgba(255, 255, 255, 0.1);
                border-color: rgba(255, 255, 255, 0.15);
            }

            .btn-text {
                background: none;
                border: none;
                color: #a1a1aa;
                font-size: 13px;
                font-weight: 600;
                font-family: 'Inter', system-ui, sans-serif;
                cursor: pointer;
                padding: 8px 0;
                transition: color 0.15s;
            }

            .btn-text:hover { color: #d4d4d8; }

            /* ---- Footer / Divider ---- */
            .auth-footer {
                text-align: center;
                margin-top: 28px;
                font-size: 14px;
                color: #71717a;
            }

            .auth-divider {
                display: flex;
                align-items: center;
                gap: 16px;
                margin: 28px 0;
                color: #52525b;
                font-size: 12px;
                font-weight: 500;
                letter-spacing: 0.5px;
                text-transform: uppercase;
            }

            .auth-divider::before,
            .auth-divider::after {
                content: '';
                flex: 1;
                height: 1px;
                background: rgba(255, 255, 255, 0.06);
            }

            .auth-actions {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
                margin-top: 8px;
            }

            .auth-description {
                text-align: center;
                font-size: 14px;
                color: #a1a1aa;
                line-height: 1.6;
                margin-bottom: 28px;
            }

            /* ---- Responsive ---- */
            @media (max-width: 480px) {
                .auth-card {
                    padding: 32px 24px 28px;
                    margin: 16px;
                    border-radius: 20px;
                }
            }
        </style>
    </head>
    <body>
        {{ $slot }}
    </body>
</html>
