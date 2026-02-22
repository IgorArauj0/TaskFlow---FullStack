<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>TaskFlow - Cadastro</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <div class="card">
        <h2>Criar Conta</h2>

        <form method="POST" action="{{ route('register') }}" id="registerForm">
            @csrf
            <div class="input-group">
                <label>Nome</label>
                <input type="text" id="name" name="name" required>
            </div>

            <div class="input-group">
                <label>Email</label>
                <input type="email" id="email" name="email" required>
            </div>

            <div class="input-group">
                <label>Senha</label>
                <input type="password" id="password" name="password" required>
            </div>

            <div class="input-group">
                <label>Confirmar Senha</label>
                <input type="password" id="password_confirmation" name="password_confirmation" required>
            </div>

            <button type="submit">Cadastrar</button>
        </form>

        <div class="switch">
            Já tem conta? <a href="login.html">Entrar</a>
        </div>
    </div>

    <script src="js/main.js"></script>
</body>
</html>
