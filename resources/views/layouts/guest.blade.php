<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap">

        <!-- Styles -->
        @vite(['resources/css/app.css'])

        <style>
            *, *::before, *::after { box-sizing: border-box; }

            body {
                margin: 0;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, #f3ebf6 0%, #e8d5f5 100%);
                font-family: 'Nunito', sans-serif;
            }

            .auth-card {
                background: #ffffff;
                width: 100%;
                max-width: 420px;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(140, 85, 170, 0.18);
                padding: 40px 40px 36px;
                margin: 24px;
            }

            .auth-logo {
                display: flex;
                justify-content: center;
                margin-bottom: 28px;
            }

            .auth-logo svg {
                width: 52px;
                height: 52px;
                fill: #9C27B0;
            }

            .auth-title {
                text-align: center;
                font-size: 22px;
                font-weight: 800;
                color: #4a235a;
                margin: 0 0 6px;
            }

            .auth-subtitle {
                text-align: center;
                font-size: 13px;
                color: #9e7aad;
                margin: 0 0 28px;
            }

            .auth-alert {
                background: #fef3cd;
                border: 1px solid #fcd34d;
                color: #92400e;
                border-radius: 10px;
                padding: 10px 14px;
                font-size: 13px;
                margin-bottom: 18px;
            }

            .auth-alert.success {
                background: #d1fae5;
                border-color: #6ee7b7;
                color: #065f46;
            }

            .auth-alert.error {
                background: #fee2e2;
                border-color: #fca5a5;
                color: #991b1b;
            }

            .form-group {
                margin-bottom: 18px;
            }

            .form-label {
                display: block;
                font-size: 13px;
                font-weight: 700;
                color: #6b3a7d;
                margin-bottom: 6px;
                letter-spacing: 0.4px;
            }

            .form-input {
                width: 100%;
                padding: 11px 16px;
                border: 2px solid #e9d5f0;
                border-radius: 12px;
                font-size: 14px;
                font-family: 'Nunito', sans-serif;
                color: #2d1b36;
                background: #faf5fc;
                outline: none;
                transition: border-color 0.2s, box-shadow 0.2s;
            }

            .form-input:focus {
                border-color: #9C27B0;
                box-shadow: 0 0 0 3px rgba(156, 39, 176, 0.12);
                background: #fff;
            }

            .form-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 24px;
                margin-top: 4px;
            }

            .form-check {
                display: flex;
                align-items: center;
                gap: 7px;
                font-size: 13px;
                color: #7a5a88;
                cursor: pointer;
            }

            .form-check input[type=checkbox] {
                accent-color: #9C27B0;
                width: 15px;
                height: 15px;
                cursor: pointer;
            }

            .auth-link {
                font-size: 13px;
                color: #9C27B0;
                text-decoration: none;
                font-weight: 700;
            }

            .auth-link:hover { text-decoration: underline; }

            .btn-primary {
                width: 100%;
                padding: 13px;
                background: linear-gradient(135deg, #9C27B0, #ce66e0);
                color: #fff;
                border: none;
                border-radius: 12px;
                font-size: 15px;
                font-weight: 800;
                font-family: 'Nunito', sans-serif;
                cursor: pointer;
                letter-spacing: 0.5px;
                box-shadow: 0 4px 14px rgba(156, 39, 176, 0.35);
                transition: opacity 0.2s, transform 0.1s;
            }

            .btn-primary:hover  { opacity: 0.92; }
            .btn-primary:active { transform: scale(0.98); }

            .auth-footer {
                text-align: center;
                margin-top: 22px;
                font-size: 13px;
                color: #9e7aad;
            }

            @media (max-width: 480px) {
                .auth-card { padding: 30px 24px 28px; margin: 16px; }
            }
        </style>
    </head>
    <body>
        {{ $slot }}
    </body>
</html>
