Contribuire in Aurea
====================

Le patch di terze parti sono essenziali per rendere grande Aurea. Purtroppo non abbiamo la possibilità di accedere all'enorme quantità di piattaforme e alla miriade di configurazioni possibili per l'esecuzione di Aurea. Noi vorremmo che tu sia in grado di contribuire, nel modo più semplice possibile, con soluzioni che permettano di fan funzionare Aurea nel tuo ambiente. D'altro canto, abbiamo bisogno che i collaboratori seguino alcune linee guida in modo da mantenere il controllo della situazione.

Per cominciare
--------------

* Assicurati di avere un [account GitHub](https://github.com/signup/free)
* Segnala una issue, assumendo che non esista già.
  * Descrivi chiaramente l'issue incudendo gli step per riprodurre il bug.
  * Assicurati di segnalare la prima versione in cui accerti di aver scoperto il bug.
* Effettua il fork del repository.

Creare un contributo
--------------------

* Crea un topic branch su cui lavorare.
  * Tipicamente questo è il master branch.
  * Rivolgiti solo ai branch al quale il tuo fix è rivolto.
  * Per creare rapidamente un topic branch basato sul master usa `git branch fix/master/my_contribution master` e quindi effettua il checkout del nuovo branch con `git checkout fix/master/my_contribution`. Non lavorare direttamente sul `master` branch.
* Effettua solo commit di unità logiche.
* Evita spazi superflui usando `git diff --check` prima di effettuare il commit.
* Assicurati che il tuo messaggio di commit sia nel formato corretto.

````
		(#99999) Fare un esempio concreto nel documento CONTRIBUTING

		Senza questa patch l'esempio del messaggio di commit nel documento
		CONTRIBUTING non è concreto. Questo è un problema perché il collaboratore
		non sa come dovrebbe essere un messaggio di commit, e potrebbe basarsi su
		una descrizione invece che su un esempio. Questa patch risolve il problema
		presentando un esempio concreto.

		La prima linea è una vera e propria dichiarazione imperativa con il numero
		di ticket dalla issue. Il corpo descrive il comportamento senza la patch,
		perché questo è un problema, e come la patch risolve il problema quando
		applicata.
````

* Assicurati di aver aggiunto i test necessari per il tuo fix.
* Esegui _tutti_ i test per assicurarti che nulla si sia danneggiato accidentalmente.

Creare un contributo banale
---------------------------

### Documentazione

Per contributi di natura banale a commenti e documentazioni, non è sempre necessario creare una nuova issue. In questo caso, è opportuno iniziare la prima linea di un commit con '(doc)' al posto del numero di ticket.

````
		(doc) Aggiungere un esempio di commit su documentazione a CONTRIBUTING

		Non ci sono esempi per contribuire con un commit su documentazione nei
		repository apuliasoft. Questo è un problema perché il collaboratore non sa
		come dovrebbe essere un commit di questa natura.

		La prima linea è una vera e propria dichiarazione imperativa con '(doc)' al
		posto del numero di ticket. Il corpo descrive la natura della nuova
		documentazione o dei nuovi commenti aggiunti.
````

Sottoporre i contributi
-----------------------

* Effettua il push dei tuoi contributi ad un topic branch nel tuo fork del repository.
* Invia una pull request al repository apuliasoft.
* Aggiorna il tuo ticket per segnalare che hai inviato del codice e che questo è pronto per essere revisionato.
  * Includi un link alla pull request nel ticket.
