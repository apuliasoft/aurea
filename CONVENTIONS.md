Convenzioni in Aurea
====================
Questa pagina elenca tutte le buone pratiche (da rispettare ad ogni costo) e le cattive pratiche (da evitare ad ogni costo) che devono essere osservate da ogni sviluppatore che vuole contribuire al progetto Aurea.

Buone pratiche
--------------
* riportare la descrizione di una issue in Italiano ogni qualvolta è possibile, Inglese altrimenti.
* riportare il numero ed il link della issue quando si effettua il commit di un bug fix, di un enhancement o di qualunque cambiamento fatto in relazione ad una issue aperta.
* rispettare lo stile e le convenzioni di programmazione JavaScript.
* usare immagini png ogni qualvolta è possibile, gif altrimenti.
* quando si incontra un bug, prima bisogna aprire una issue e descriverlo, e poi si può effettuare il fix ed il commit della soluzione.
* scrivere dei casi di test per ogni nuova feature aggiunta quando possibile.
* aggiungere il prologo della GNU General Public License (GNU GPL) quando si aggiunge un nuovo file al repository.
* ogni nuova build caricata nella sezione Downloads deve rispettare la seguente convenzione:
  * aurea_X.Y.Z.zip (e.g. aurea_1.2.3.zip)
* ogni qualvolta una nuova release stabile viene caricata, i suoi cambiamenti devono essere descritti appropriatamente nel file di changlog all'interno del repository.

Cattive pratiche
----------------
* aggiungere commenti in Italiano.
* effettuare commit di file danneggiati.
* effettuare commit di file non testati.
* effettuare commit di file non formattati.
* effettuare commit di file con warning.
* effettuare commit di file con import non organizzati.
* effettuare commit di file con commenti annotati con XXX, TODO e FIXME che non sono correlati con una issue aperta nell'issue tracker.
* effettuare commit di file con blocchi di codice morti.
* effettuare commit di una qualunque risorsa senza commentare il commit stesso.
* effettuare commit senza nessun caso di test correlato (ove possibile) a prova che tutto funzioni correttamente.
* effettuare commit di immagini il cui nome contenga lettere maiuscole.
