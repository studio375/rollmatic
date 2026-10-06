export async function GET() {
    const content = `
        # Rollmatic

        > Rollmatic provides professional bakery and pastry machinery for Italian-style panetteria and pasticceria operations.

        ## Main

        - [Rollmatic | Macchinari per Panetteria e Pasticceria | Made in Italy](https://www.rollmatic.com/): Sfogliatrici, impastatrici planetarie, spezza arrotondatrici e taglierine per il pane. Macchinari professionali per panifici e pasticcerie

        ## News

        - [News](https://www.rollmatic.com/news): Rimani aggiornato sulle ultime novità di Rollmatic: fiere, nuovi prodotti e aggiornamenti dal mondo dei macchinari per panetteria e pasticceria

        ## Impastatrici planetarie

        - [Impastatrici Planetarie Professionali](https://www.rollmatic.com/impastatrici-planetarie): Impastatrici planetarie Rollmatic da 40 a 160 litri per pasticcerie e panifici: montaggio, impasto ed emulsione con la massima affidabilità
        - [B40P Impastatrice Planetaria 40 Litri](https://www.rollmatic.com/impastatrici-planetarie/b40p): Impastatrice planetaria B40P da 40 litri: vasca basculante, inverter, trasmissione in bagno d'olio. Massima fluidità e affidabilità
        - [B60L Impastatrice Planetaria 60 Litri](https://www.rollmatic.com/impastatrici-planetarie/b60l): Impastatrice planetaria B60L da 60 litri con vasca basculante verso l'operatore: inverter, trasmissione in bagno d'olio, massima fluidità
        - [B60 / B60P Impastatrice Planetaria 60 Litri](https://www.rollmatic.com/impastatrici-planetarie/b60-b60p): Impastatrici planetarie B60 e B60P da 60 litri: inverter, trasmissione in bagno d'olio. B60P con motore potenziato 3.0 kW
        - [B80L Impastatrice Planetaria 80 Litri](https://www.rollmatic.com/impastatrici-planetarie/b80l): Impastatrice planetaria B80L da 80 litri per alta produttività: inverter, trasmissione in bagno d'olio, struttura solida e silenziosa
        - [SOLL100 / SOLL160 Sollevatore Vasca Planetaria](https://www.rollmatic.com/impastatrici-planetarie/soll100-soll160): Sollevatore vasca SOLL100/SOLL160 per impastatrici planetarie B100 e B160: movimentazione elettrica, zero sforzo per l'operatore
        - [B100 / B160 Impastatrice Planetaria Industriale](https://www.rollmatic.com/impastatrici-planetarie/b100-b160): Impastatrici planetarie B100 e B160 da 100 e 160 litri per produzione industriale: massima stabilità, inverter, trasmissione in bagno d'olio

        ## Settori

        - [Settori](https://www.rollmatic.com/settori): Macchinari Rollmatic per panificazione, pasticceria e pizza: scopri le soluzioni pensate per ogni fase della produzione nel tuo settore
        - [Macchinari per Pasticceria](https://www.rollmatic.com/settori/pasticceria): Macchinari Rollmatic per pasticceria: impastatrici planetarie e sfogliatrici per creme, impasti e pasta sfoglia con la massima precisione
        - [Macchinari per Pizzerie](https://www.rollmatic.com/settori/pizza): Macchinari Rollmatic per pizzerie: spezzatrici e spezza arrotondatrici per velocizzare e uniformare la preparazione della pizza
        - [Macchinari per Panificazione](https://www.rollmatic.com/settori/panificazione): Macchinari Rollmatic per panificazione: spezzatrici arrotondatrici, sfogliatrici e taglierine per ogni fase della produzione del pane

        ## Sfogliatrici

        - [Sfogliatrici Professionali](https://www.rollmatic.com/sfogliatrici): Sfogliatrici manuali, semiautomatiche e automatiche Rollmatic per pasticcerie, panifici e laboratori artigianali. Laminazione uniforme e precisa
        - [R65AX Sfogliatrice Automatica Inox](https://www.rollmatic.com/sfogliatrici/r65ax-r65ax-t): Sfogliatrice automatica R65AX Rollmatic in acciaio inox, top di gamma: sfarinatore e avvolgitore automatici di serie. Massima igiene
        - [R65AXP Sfogliatrice Automatica Industriale](https://www.rollmatic.com/sfogliatrici/r65axp-r65axp-t): Sfogliatrice automatica R65AXP Rollmatic: apertura cilindri 60mm, trasmissione a cinghia, piano intermedio con bacinelle. Top di gamma
        - [R65A Sfogliatrice Automatica 65 cm](https://www.rollmatic.com/sfogliatrici/r65a-r65a-t-6): Sfogliatrice automatica R65A Rollmatic: touch screen 7'' con 100 programmi, trasmissione a catena. Massima efficienza per grandi produzioni
        - [R62 Sfogliatrice Manuale Sistema Frizionato®](https://www.rollmatic.com/sfogliatrici/r62-r62-t): Sfogliatrice manuale R62 Rollmatic con Sistema di Regolazione Frizionato® brevettato e raschiatori QR®. Precisione micrometrica senza sforzo
        - [R65S Sfogliatrice Semiautomatica](https://www.rollmatic.com/sfogliatrici/r65s-r65s-t): Sfogliatrice semiautomatica R65S Rollmatic: touch screen 4,5'' con 50 programmi, cilindri 650mm. Alte prestazioni e precisione costante
        - [R60 Sfogliatrice Manuale 60 cm](https://www.rollmatic.com/sfogliatrici/r60-r60-t): Sfogliatrice manuale professionale R60 Rollmatic: cilindri 600mm, apertura 50mm, inversione a barra e pedaliera. Anche con gruppo di taglio
        - [R65 Sfogliatrice Manuale 65 cm Top di Gamma](https://www.rollmatic.com/sfogliatrici/r65-r65-t): Sfogliatrice manuale R65 Rollmatic, top di gamma: cilindri 650mm, Sistema Frizionato® brevettato, raschiatori QR®. Massima precisione
        - [R55B Sfogliatrice da Banco 55 cm](https://www.rollmatic.com/sfogliatrici/r55b): Sfogliatrice da banco R55B Rollmatic: tavoli ripiegabili ed estraibili, cilindri 550mm, carrello opzionale
        - [R50 Sfogliatrice Manuale Compatta 50 cm](https://www.rollmatic.com/sfogliatrici/r50): Sfogliatrice manuale compatta R50 Rollmatic con base integrata: cilindri 500mm, tavoli ripiegabili ed estraibili
        - [R55 Sfogliatrice Manuale Compatta 55 cm](https://www.rollmatic.com/sfogliatrici/r55): Sfogliatrice manuale compatta R55 Rollmatic con base integrata: cilindri 550mm, massima flessibilità operativa
        - [TB30 / TB35 Tavolo da Lavoro Inox](https://www.rollmatic.com/sfogliatrici/tb30-tb35): Tavolo da lavoro TB30/TB35 Rollmatic in acciaio inox, in linea con la sfogliatrice: prese integrate, motore protetto, velocità regolabile
        - [R50B Sfogliatrice da Banco 50 cm](https://www.rollmatic.com/sfogliatrici/r50b): Sfogliatrice da banco R50B Rollmatic: tavoli ripiegabili, cilindri 500mm, carrello opzionale. Compatta e versatile
        - [S5BM Sfogliatrice Manuale Compatta](https://www.rollmatic.com/sfogliatrici/s5bm): Sfogliatrice manuale compatta S5BM Rollmatic: cilindri 500mm, joystick, massima compattezza per laboratori con spazi ridotti

        ## Spezza arrotondatrici

        - [Spezza Arrotondatrici Professionali](https://www.rollmatic.com/spezza-arrotondatrici): Spezzatrici arrotondatrici manuali, semiautomatiche e automatiche per pizzerie, panifici e pasticcerie. Porzioni perfette, massima produttività
        - [DR-A Spezza Arrotondatrice Automatica](https://www.rollmatic.com/spezza-arrotondatrici/dr-a): Spezza arrotondatrice automatica DR-A: ciclo interamente automatico, touch screen con 12 programmi, sfere perfette. Massima produttività
        - [DR-S Spezzatrice Arrotondatrice Semiautomatica](https://www.rollmatic.com/spezza-arrotondatrici/dr-s): Spezzatrice arrotondatrice semiautomatica DR-S: touch screen, pedaliera per l'arrotondamento, sfere perfette. Massima produttività
        - [DR-M Spezzatrice Arrotondatrice Manuale](https://www.rollmatic.com/spezza-arrotondatrici/dr-m): Spezzatrice arrotondatrice manuale DR-M: ciclo a leva e pedaliera, sfere di peso e forma identici. Robusta, compatta ed ergonomica

        ## Taglierine

        - [Taglierine per Pane Professionali](https://www.rollmatic.com/taglierine): Taglierine per pane Rollmatic: manuali, semiautomatiche, automatiche e industriali. Fette perfette per panifici, supermercati e grandi cucine
        - [S40-S / S50-S Taglierina Self-Service](https://www.rollmatic.com/taglierine/s40-s-s50-s): Taglierine automatiche S40-S/S50-S Rollmatic per aree self-service: 3 spessori preselezionabili, massima sicurezza per il cliente finale
        - [S40 / S50 Taglierina Spessore Variabile](https://www.rollmatic.com/taglierine/s40-s50): Taglierine automatiche S40/S50 Rollmatic: spessore fetta variabile 3-30mm, touch screen, 4 modalità di taglio. Fidelizza i clienti
        - [CP42-S / CP52-S Taglierina Automatica su Ruote](https://www.rollmatic.com/taglierine/cp42-s-cp52-s): Taglierine automatiche CP42-S/CP52-S Rollmatic su base con ruote: taglio singolo o continuo, larghezza 420 o 520mm
        - [CP42 / CP52 Taglierina Automatica da Banco](https://www.rollmatic.com/taglierine/cp42-cp52): Taglierine automatiche CP42/CP52 Rollmatic: taglio singolo o continuo, velocità regolabile, larghezza 420 o 520mm
        - [C42-S / C52-S Taglierina su Base con Ruote](https://www.rollmatic.com/taglierine/c42-s-c52-s): Taglierine semiautomatiche C42-S/C52-S Rollmatic su base con ruote: larghezza 420 o 520mm, facilmente movibili
        - [CP42-PL Taglierina Automatica per Supermercati](https://www.rollmatic.com/taglierine/cp42-pl): Taglierina automatica CP42-PL Rollmatic per catene di supermercati: lame rinforzate, coperchio e sportello di sicurezza automatici
        - [G42 Taglierina da Banco per Pane](https://www.rollmatic.com/taglierine/g42): Taglierina semiautomatica G42 Rollmatic: la più compatta e accessibile della gamma. Passo fisso 7-21mm, ideale per retrobanco
        - [C42 / C52 Taglierina Semiautomatica da Banco](https://www.rollmatic.com/taglierine/c42-c52): Taglierine semiautomatiche C42/C52 Rollmatic: larghezza 420 o 520mm, passo fisso 7-21mm. Solide e affidabili nel tempo
        - [MI52 Taglierina Industriale per Pane](https://www.rollmatic.com/taglierine/mi52): Taglierina industriale MI52 Rollmatic: fino a 1200 pagnotte all'ora, tappeto motorizzato 1500mm. Massima produttività
        - [MR52 Taglierina Industriale Cambio Lama Rapido](https://www.rollmatic.com/taglierine/mr52): Taglierina industriale MR52 Rollmatic con telai intercambiabili brevettati: cambio passo di taglio rapido, tappeto motorizzato 2000mm
        - [APS-FS Soffiatore per Insacchettamento](https://www.rollmatic.com/taglierine/aps-fs): Soffiatore manuale APS-FS Rollmatic: apre i sacchetti con un flusso d'aria, velocizza l'insacchettamento del pane. Telaio inox
        - [BM11 Macina Pane Potenziato 140 kg/h](https://www.rollmatic.com/taglierine/bm11): Macina pane BM11 Rollmatic, il più potente della gamma: fino a 140 kg/ora, kit mollica opzionale. Massima diversificazione produttiva
        - [MAC100 Macina Pane Professionale](https://www.rollmatic.com/taglierine/mac100): Macina pane MAC100 Rollmatic: fino a 80 kg/ora, setaccio reversibile con due granulometrie. Riduci gli sprechi di pane invenduto

        ## More

        - [Azienda](https://www.rollmatic.com/azienda): Scopri Rollmatic: oltre 40 anni di esperienza nella produzione di macchinari professionali per panetteria e pasticceria
        - [Contatti](https://www.rollmatic.com/contatti): Contatta Rollmatic per informazioni sui macchinari per panetteria e pasticceria. Siamo a tua disposizione per richieste e preventivi
        - [Rollmatic | Macchinari in Pronta Consegna](https://www.rollmatic.com/pronta-consegna): Macchinari Rollmatic in pronta consegna: sfogliatrici, impastatrici, spezza arrotondatrici e taglierine. Qualità Made in Italy, spedizione rapida
        - [Sfogliatrici Manuali Professionali](https://www.rollmatic.com/sfogliatrici-manuali-professionali): Sfogliatrici manuali Rollmatic 600-650mm: R60, R62, R65. Sistema frizionato brevettato e raschiatori QR® per la massima precisione
        - [Grazie](https://www.rollmatic.com/grazie): Grazie page (thanks)
    `;
  
    return new Response(content, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
}