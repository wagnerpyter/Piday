# Mago Zero — esqueleto operacional

## Finalidade

O Mago Zero é uma camada simples para organizar logs técnicos e classificá-los provisoriamente pelas **Notas de Ada**. Ele não é uma persona autônoma complexa, não recebe automaticamente o conteúdo do site e não substitui a curadoria humana.

A unidade de entrada do Mago é o **telegrama técnico**: um parágrafo neutro derivado de um trecho de log. A unidade de saída é uma classificação A–G, acompanhada de categoria, sequência e proveniência.

## Componentes mínimos

| Componente | Função |
|---|---|
| `notas-ada.json` | Taxonomia A–G e categorias canônicas |
| `telegram-schema.json` | Forma mínima de um telegrama de entrada |
| `mago-zero.js` | Classificador determinístico e organizador de sequência |
| `logs.example.jsonl` | Exemplo neutro de entrada |
| `mago-zero.html` | Página estrutural de demonstração local |

## Fluxo

```text
log bruto preservado fora do Mago
        ↓
trecho selecionado
        ↓
telegrama técnico neutro
        ↓
Mago Zero analítico ou local
        ↓
Nota de Ada provisória
        ↓
sequência e revisão humana
```

O Mago permanente do site pode exibir a estrutura e exemplos públicos, mas não deve receber automaticamente backups privados ou resultados de análises temporárias.

## Notas de Ada

| Letra | Categoria | Função inicial |
|---|---|---|
| A | Crítico | sinal de ameaça ou ruptura de alta prioridade |
| B | Erro | falha efetivamente observada |
| C | Aviso | risco, limite ou condição que exige atenção |
| D | Informação | registro neutro ou continuidade sem alteração crítica |
| E | Depuração | teste, implementação ou investigação técnica |
| F | Requisição | solicitação ou comando de processamento |
| G | Sucesso | conclusão, validação ou mitigação bem-sucedida |

As classificações são inicialmente `provisional`. A ocorrência de uma palavra como “erro” não basta para gerar B: o classificador deve distinguir falha efetiva, risco descrito, referência histórica e mitigação.

## Isolamento

O diretório é código e documentação do esqueleto. Ele não contém backups privados. O runtime futuro no Cloudflare deverá usar namespace ou `analysis_id` próprio para cada análise temporária. A publicação no site só deve ocorrer depois de revisão e aprovação explícita.
