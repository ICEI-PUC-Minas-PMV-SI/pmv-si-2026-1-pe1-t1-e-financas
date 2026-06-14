# Instruções de utilização

## Instalação do Site

O site utiliza módulos JavaScript nativos e deve ser executado por um servidor web.

Na raiz do projeto, execute:

```bash
python3 -m http.server 8000 --directory src
```

Depois, acesse `http://localhost:8000`.

## Autenticação local

As contas, sessões e informações financeiras são armazenadas somente no
`localStorage` do navegador. Essa autenticação serve para fins educacionais e
não substitui um backend seguro em produção.

Para executar os testes automatizados:

```bash
npm test
```

## Histórico de versões

### [0.1.0] - DD/MM/AAAA
#### Adicionado
- Adicionado ...
