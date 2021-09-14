@extends('/layouts/layout')
@push('styles')
    <link href="{{ asset('css/login.css') }}" rel="stylesheet">
@endpush
@section('content')
{{-- <x-guest-layout>
    <x-auth-card>
        <!-- Session Status -->
        <x-auth-session-status class="mb-4" :status="session('status')" />

        <!-- Validation Errors -->
        <x-auth-validation-errors class="mb-4" :errors="$errors" />

        <form method="POST" action="{{ route('login') }}">
            @csrf

            <!-- Email Address -->
            <div>
                <x-label for="email" :value="__('Email')" />

                <x-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autofocus />
            </div>

            <!-- Password -->
            <div class="mt-4">
                <x-label for="password" :value="__('Password')" />

                <x-input id="password" class="block mt-1 w-full"
                                type="password"
                                name="password"
                                required autocomplete="current-password" />
            </div>

            <!-- Remember Me -->
            <div class="block mt-4">
                <label for="remember_me" class="inline-flex items-center">
                    <input id="remember_me" type="checkbox" class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" name="remember">
                    <span class="ml-2 text-sm text-gray-600">{{ __('Remember me') }}</span>
                </label>
            </div>

            <div class="flex items-center justify-end mt-4">
                @if (Route::has('password.request'))
                    <a class="underline text-sm text-gray-600 hover:text-gray-900" href="{{ route('password.request') }}">
                        {{ __('Forgot your password?') }}
                    </a>
                @endif

                <x-button class="ml-3">
                    {{ __('Log in') }}
                </x-button>
            </div>
        </form>
    </x-auth-card>
</x-guest-layout> --}}
<div class="wrapper fadeInDown">
    <div id="formContent">
      <x-auth-session-status class="mb-4" :status="session('status')" />
      <form method="POST" action="{{ route('login') }}">
        @csrf
        <div class="mt-4 d-flex justify-content-center align-items-center flex-column">
            <x-label for="email" class="text-center" :value="__('Email')" />

            <x-input id="email" class="fadeIn first email-input" type="email" name="email" :value="old('email')" required autofocus />
        </div>
        <div class="mt-4 d-flex justify-content-center align-items-center flex-column">
            <x-label for="password" class="text-center" :value="__('Password')" />

            <x-input id="password" class="fadeIn second password-input"
                            type="password"
                            name="password"
                            required autocomplete="current-password" />
        </div>
        <input type="submit" class="fadeIn third " value="{{ __('Log in') }}">
        <x-auth-validation-errors class="mb-4" :errors="$errors" />
      </form>
      <div id="formFooter">
        @if (Route::has('password.request'))
        <a class="underlineHoverPass forgot-pass" href="{{ route('password.request') }}">Forgot Password?</a>
        @endif
      </div>
  
    </div>
  </div>
@endsection