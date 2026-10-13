# Apita! — v3.4 (melhorias: Estatísticas, súmula, pênaltis, agenda automática, backup e PWA)

Arquivos: `Apita!.html` (app), `pwa/` (versão hospedável e instalável), `testes/` (7 scripts, 185 verificações).

## [STATS] Estatísticas de verdade + minuto dos eventos
- Gols e cartões agora guardam **o minuto** (inclusive acréscimo, ex.: 25+2', e 1ºT/2ºT). Desfazer um gol ou remover um cartão remove o evento junto; segundo amarelo gera amarelo + vermelho; editar o jogador do cartão atualiza o evento. Ao encerrar, a linha do tempo fica guardada na partida.
- **Súmula** (linha do tempo da partida) em "Ver súmula": no menu da partida do calendário e nos jogos dos campeonatos. Partidas antigas, sem minuto, mostram o resumo de gols e cartões.
- O botão **Estatísticas** do Home deixou de ser só um botão: artilheiros, disciplina (vermelho pesa 3) e desempenho das equipes (J, V, E, D, GP, GC, SG, aproveitamento), com filtro por campeonato ou partidas avulsas. Só conta partida encerrada.

## [CAMPEONATO] Pênaltis na Copa
- "Decidir nos pênaltis" no jogo do chaveamento (em destaque quando o tempo normal terminou empatado): informa o placar, valida que não pode empatar e o vencedor avança. O placar dos pênaltis aparece na chave, e "Desfazer resultado" limpa tudo.

## [PONTOS] Agendamento automático das rodadas
- Informa data da 1ª rodada, horário, minutos entre jogos (sugere duração × períodos + 10), dias entre rodadas e local. Cria as partidas na agenda; não mexe em jogos já disputados e, por padrão, mantém os que já têm data (rodar de novo não duplica nada).

## [CONFIG] Segurança dos dados
- Mostra a data do **último backup** e o **armazenamento usado** (barra; avisa a partir de 70%).
- **Lembrete de backup** na Home quando há dados importantes e nunca houve backup (ou faz mais de 30 dias); "Lembrar depois" adia 14 dias.
- Aviso do navegador ao fechar a página com o **cronômetro rodando**.
- Escudos enviados agora são salvos em **WebP** (bem menores que PNG), com PNG como alternativa.

## [PWA] Instalar e usar sem internet
- Pasta `pwa/` pronta para hospedar (GitHub Pages ou Netlify): `index.html`, `manifest.webmanifest`, `sw.js`, ícones 192/512/maskable e `README.md` com o passo a passo. Depois de hospedado: botão "Instalar o Apita!" em Configurações (Android/Chrome), instruções para iPhone e **o app abre sem internet**.
- A versão do link de pré-visualização do Claude não instala nem funciona offline (limite do ambiente): só a versão hospedada.

## Correções
- Um campeonato de Copa recém-criado agora já nasce com `formato: 'copa'` (antes só ganhava depois de recarregar).

## Testes
- Novos: `t_melhorias.js` (45), `t_pwa.js` (13, servidor local + offline de verdade) e `t_regressao.js` (37: menu, cronômetro, cartão↔falta, capitão, 3D, borracha, wizard/calendário, equipes, Copa, arte, configurações, migração). Junto com os 90 de Pontos Corridos: **185 verificações, 0 falhas** (`node testes/rodar_todos.js`).

# Apita! — v3.3 (campeonato por Pontos Corridos)

Arquivos alterados: `Apita!.html` (único arquivo do app) e, novos, `testes/` (4 testes + executor).
O modo **Copa** não foi alterado: o formato é um campo novo do campeonato (`formato`, padrão `copa` para os já existentes).

## [PONTOS] O que foi feito
- **Criação**: escolha entre **Copa** e **Pontos corridos**, com a explicação de como cada um organiza os jogos, calcula a classificação e define o campeão. Em Pontos corridos: **Turno único** ou **Turno e returno** (mando invertido), com resumo ao vivo ("N equipes → X rodadas e Y jogos", aviso de folga se for ímpar). Nada fixo em 20 equipes/38 rodadas.
- **Calendário** gerado pelo método do círculo, com sorteio da ordem: sem confrontos duplicados, sem time contra si mesmo, cada equipe joga uma vez por rodada; número ímpar = uma folga por equipe por turno.
- **Classificação automática** (Pos., Equipe com escudo, P, J, V, E, D, GP, GC, SG), recalculada ao registrar, editar ou remover resultado. Só jogo finalizado com placar completo conta.
- **Desempate**: saldo de gols → gols marcados → confronto direto (pontos e gols nos duelos entre **todas** as equipes empatadas; a regra se repete dentro do subgrupo que continuar empatado). Se persistir, as equipes dividem a posição (sem critério inventado).
- **Tela do campeonato**: visão geral (equipes, rodadas, jogos realizados/restantes, progresso, líder), abas **Classificação**, **Rodadas** (navegação por rodada, escudos, data/hora/local, placar e situação) e **Estatísticas** (melhor ataque/defesa, maior saldo, mais vitórias/empates/derrotas). Campeão ao fim; empate na liderança é mostrado como tal.
- **Integração com as partidas**: cada jogo pode ser **iniciado pela arbitragem**, **agendado** (aparece no calendário) ou ter o **resultado registrado/editado/removido** à mão. A arbitragem, o card da Home, o calendário e o histórico mostram "Campeonato · Rodada N".
- **Integridade**: editar a partida no calendário trava os times e atualiza o jogo; excluir/cancelar a partida desvincula o jogo e recalcula a classificação; agendar duas vezes ou iniciar um jogo já agendado reaproveita a mesma partida (sem duplicar).
- **Editar equipes e formato**: reorganiza o calendário **sempre com confirmação**, informando o que muda e quantos resultados/agendamentos não existem mais no novo calendário. Resultados nos mesmos confrontos são mantidos (as partidas já encerradas que saírem continuam no histórico).
- **Persistência**: tudo no mesmo `localStorage` do app; nenhuma tecnologia nova.

## Decisões técnicas
- Reaproveitei `camp.rodadas` e o vínculo `partida.campeonatoId` + `partida.jogoRef` que a Copa já usava, em vez de criar outro modelo.
- A classificação é uma função pura (`classificarPontos`), sem DOM, para poder ser testada isoladamente.
- Na Copa só entraram rótulos novos (formato e "campeonato · fase" nas partidas); a lógica de mata-mata é a mesma.

## Testes (`testes/rodar_todos.js`, 90 verificações)
- Pontuação (vitória 3, empate 1, derrota 0), saldo, gols marcados, confronto direto (2 e 3+ equipes, inclusive caso fixo e 6.000 campeonatos aleatórios comparados com uma implementação de referência independente), edição de resultado, jogos não finalizados.
- Calendário de 2 a 24 equipes (pares e ímpares) em turno único e returno: número de rodadas/jogos, sem duplicatas, folgas, mando espelhado.
- Interface: criação, registro/edição/remoção de resultados, jogo pela arbitragem, agenda/calendário, exclusão/cancelamento, estatísticas, reorganização com confirmação, persistência após recarregar, campeão/empate, exclusão do campeonato.
- Regressão: os 15 testes anteriores (inclusive o da Copa) continuam passando.

# Apita! — v3.2 (menu novo, Configurações e Campeonato)

## [HOME] Menu de acesso rápido (layout do mockup)
- Linha 1: **Elenco** e **Campeonato**. Linha 2: **Área Tática**, **Estatísticas** e, empilhados à direita, **Histórico** e **Configurações**.
- Ícones enviados (Elenco, Estatísticas, Campeonato, Histórico, Configurações, Área Tática) recortados e otimizados (17 KB no total).
- "Prancha tática" passou a se chamar **Área tática** em todo o app (Home, menu lateral, aba Mais e janela).
- **Estatísticas** é só o botão (sem tela), como combinado. **Histórico** continua abrindo o histórico de partidas.

## [CONFIG] Configurações
- Som dos alertas, Vibração e Manter a tela ligada: cada chave realmente liga/desliga o recurso e fica salva.
- Dados: Exportar backup (arquivo .json), Importar backup (valida o arquivo e pede confirmação) e Apagar todos os dados.

## [CAMPEONATO] Sorteio e chaveamento (mata-mata)
- Criar campeonato: nome, esporte, minutos por período, nº de períodos e equipes participantes (2 a 32, vindas da aba Equipes).
- **Sorteio**: embaralha as equipes de forma aleatória e mostra os confrontos da primeira fase um a um. Se o número não for potência de 2, as equipes sem adversário ganham **folga** e avançam direto.
- **Chaveamento**: colunas por fase (… Quartas, Semifinal, Final), com rolagem horizontal.
- Cada jogo abre um menu: **Iniciar partida** (abre a arbitragem com as equipes e o esporte do campeonato), ou definir o vencedor manualmente.
- Ao encerrar a partida, o **vencedor avança sozinho**. Em caso de empate, o jogo fica marcado "Empate: definir vencedor" e você escolhe quem avançou (ex.: pênaltis).
- Desfazer resultado só de trás para frente; "Sortear novamente" só enquanto nenhum jogo foi disputado; banner de **Campeão** ao fim.
- As partidas do campeonato entram no calendário com o tipo "Campeonato" (sigla Camp).

# Apita! — v3.1 (capitão, janelas separadas e borracha interativa)

## [ELENCO] Janela independente
- A antiga tela "Tática e Jogadores" foi dividida em duas janelas:
  - **Elenco** (`abrirElenco()`): cadastro, Em campo / Banco por time, limite de jogadores, goleiro, **capitão** e selos de cartão.
  - **Prancha tática** (`abrirTatica()`): somente campo, visões (completo / ataque / defesa / 3D), formações, marcadores, desenhos e anotações.
- Atalhos entre as duas ("Prancha" no topo do Elenco; "Abrir elenco e jogadores" na prancha). Home, menu lateral e aba Mais ganharam os dois itens separados.

## [ELENCO] Capitão
- Botão com a braçadeira (retângulo arredondado com "C", recriada em vetor a partir da sua referência) em cada jogador:
  contorno cinza = não é capitão; dourado preenchido = capitão. Apenas 1 por time: marcar outro desmarca o anterior; tocar de novo remove.
- Na prancha, o marcador do capitão mostra a braçadeira dourada ao lado da bolinha, atualizada na hora e acompanhando o arrasto. Vale no campo plano e no 3D.
- Salvo no estado (`jogador.capitao`).

## [TATICA] Borracha interativa
- **Borracha** agora é uma ferramenta: toque ou arraste sobre um desenho para apagá-lo individualmente
  (linhas, setas, áreas/retângulos e desenho livre). Um anel acompanha o dedo/cursor. Funciona também no 3D (acerto calculado na perspectiva).
- **Limpar prancha**: botão separado, com confirmação, que apaga tudo de uma vez.

## Ajustes de layout
- Linha de cada jogador no Elenco quebra em duas linhas quando falta espaço (nomes legíveis em 320 px).

# Apita! — v3 (Home, abas, calendário, equipes e arte para WhatsApp)

Arquivo único (`Apita!.html`), sem dependências externas. Estado em `localStorage`
(`peladaSegundaEstado`), agora com `_versao: 3`. Cada bloco novo está marcado no código
com `// [HOME]`, `// [WIZARD]`, `// [EQUIPES]`, `// [CALENDARIO]`, `// [SHARE-IMG]`,
`// [MIGRACAO]` e `// [FLUXOS]`.

## [MIGRACAO] Estado v2 → v3
- `estado._versao = 3`; novos campos: `partidas[]`, `equipes[]`, `partidaAtualId`, `periodosTotais`, `esporte`.
- Em `carregarEstado()`: se o estado salvo for anterior à v3, `migrarParaV3()` roda uma única vez.
  - Os elencos já cadastrados viram equipes salvas (com escudo = inicial).
  - Se havia jogo em andamento (placar, cartões, cronômetro), vira a partida "atual".
  - Nada é apagado: histórico, formações, desenhos e posições táticas continuam como estavam.

## [HOME] Navegação por abas
- Barra inferior fixa (Início, Jogos, Equipes, Mais), ícones SVG, aba ativa em mint, `aria-current`.
- Início: card "Jogo atual" (escudos, placar grande, cronômetro com acréscimo, selo AO VIVO pulsante / PAUSADO / ENCERRADO),
  "Continuar Partida", "Finalizar", "Compartilhar" e "+ Nova partida". Sem jogo: estado vazio com "+ Criar partida".
- Acesso rápido 2×2: Elenco, Escalação, Campo tático e Histórico (os dois primeiros rolam até a seção certa).
- Cabeçalho com menu, logo APITA! e botão de perfil (placeholder). O menu lateral continua igual e abre da Home e da arbitragem.
- A tela de arbitragem ganhou o botão "← Home"; o cronômetro segue rodando em segundo plano.
- "Mais": histórico, tática, compartilhar (imagem e texto) e "Abrir arbitragem livre" (uso sem agendar, como antes).

## [WIZARD] Criar partida
- Tela cheia, 3 etapas com barra de progresso: Data e local → Times → Configuração.
- "Avançar" fica desabilitado enquanto a etapa for inválida (data/hora; time da casa + adversário diferentes; duração 1–180).
- Equipes vêm de `estado.equipes`; "+ Nova" cria uma equipe rápida sem sair do fluxo.
  Se só o nome do adversário for digitado, a equipe é criada automaticamente.
- Esportes: Futsal, Fut7, Campo, Society, Handebol, Basquete (sugere duração e nº de jogadores em campo). 1 ou 2 períodos.
- **Iniciar partida**: clona os elencos, zera o jogo ao vivo e abre a arbitragem. **Agendar**: grava com status `agendada`.
- Se já houver partida em andamento: pergunta "Finalizar a partida atual?" (Finalizar e criar nova / Cancelar).

## [EQUIPES] Cadastro reutilizável
- Nome, cor, escudo opcional (upload reduzido a 128×128 e guardado em base64; sem upload, círculo com a inicial) e elenco (nome, número opcional, goleiro).
- "Usar nesta partida" clona o elenco para o Time A ou B (pede confirmação se já houver elenco).
- Excluir equipe não apaga partidas já registradas (guardam nome e cor).

## [CALENDARIO] Jogos agendados
- Grade mensal com navegação; pontos por status: cinza (agendada), mint (em andamento), verde-escuro (encerrada), vermelho (cancelada).
- Tocar no dia lista as partidas; tocar numa partida abre o menu: Iniciar / Continuar / Editar / Cancelar / Excluir / Compartilhar arte.
- Botão flutuante "+ Novo agendamento" (abre o wizard no dia selecionado).

## [FLUXOS] Encerrar partida
- `zerarPlacar()` e o "Finalizar" da Home usam `encerrarPartidaAtual()`: grava placar, artilheiros e cartões na partida
  (status `encerrada`), registra no histórico, zera o jogo e oferece "Compartilhar a arte".
- Correção: gols e cartões por jogador agora zeram ao encerrar. Antes eram acumulados, o que inflava o
  ranking "Artilheiros gerais" do histórico.
- `compartilharResumo()` virou `compartilharResumoTexto()`; foi criada `compartilharResumoComImagem()`.

## [SHARE-IMG] Arte para o WhatsApp
- `gerarArtePartida(dados)` desenha um canvas 1080×1920: fundo escuro com textura de grama, ícone e palavra APITA!,
  faixa FIM DE JOGO / AO VIVO, escudos, placar, ARTILHEIROS e CARTÕES em duas colunas e rodapé.
  Para mexer no layout, ajuste as constantes `Y_*` no início da função.
- Compartilhamento: `navigator.canShare({files})` → `navigator.share` com o PNG e o resumo em texto.
  Fallback: prévia da imagem, download do PNG e texto copiado.
- Botões: Home (jogo atual), fim de jogo, menu "Mais", menu lateral e calendário (partidas encerradas).

## Acessibilidade e robustez
- `aria-live="polite"` no placar e no cronômetro; todo botão só com ícone recebe `aria-label` (inclusive os criados dinamicamente).
- Fallbacks para `navigator.share`, `canvas.toBlob`, `FileReader` e `localStorage`.
- Corrigido: ao carregar uma equipe, o nome/cor dos campos da tela eram regravados por cima.

## Próximos passos opcionais
- Instalar como PWA (manifest + service worker) para funcionar offline de verdade.
- Backup/restauração dos dados em arquivo, ou sincronização entre aparelhos.
- Tela de perfil e estatísticas por equipe/jogador a partir das partidas encerradas.
- Escolher quais partidas entram na arte (ex.: várias partidas do dia numa imagem só).
