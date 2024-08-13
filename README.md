# socialmedia-api-pratice

# Documentação: 

    # Como utilizar o token:

    1. Crie um usuário em http://localhost:3333/signup;
        Postman: 
            body > raw > JSON :
            {
                "nome": ,
                "senha": ,
                "email": 
            }
    2. Logue nele pela rota http://localhost:3333/login:
        Postman: 
            body > raw > JSON :
            {
                "senha": ,
                "email": 
            }
        2.1. Copie o token que será retornado.
    3. Acesse a rota http://localhost:3333/testando:
    3.1. Ponha o token copiado dentro de: Auth > Auth Type: Bearer Token > Token
    