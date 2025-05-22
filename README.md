# Lokales Git-Repository Setup

In diesem Dokument finden Sie Schritte zum Einrichten eines lokalen Git-Repositories, zur Synchronisierung der Haupt-Branches und zur Installation von npm.

## Schritte zum Einrichten eines lokalen Git-Repositories

1. **Erstellen Sie einen Ordner auf Ihrem lokalen Computer:**

    ```bash
    mkdir mein-projekt
    cd mein-projekt
    ```

2. **Initialisieren Sie das Git-Repository:**

    ```bash
    git init
    ```

3. **Verbinden Sie Ihr lokales Repository mit einem Remote-Repository (z. B. GitHub):**

    ```bash
    git remote add origin <URL>
    ```

   Ersetzen Sie `<URL>` durch die URL Ihres Remote-Repositories.

4. **Holen Sie den `main`-Branch von Ihrem Remote-Repository und synchronisieren Sie ihn:**

    ```bash
    git pull origin main
    ```

   Dadurch wird Ihr lokaler `main`-Branch auf den neuesten Stand mit dem Remote-`main`-Branch gebracht.

## Installation von npm

5. **Installieren Sie npm (Node Package Manager):**

   Stellen Sie sicher, dass Node.js auf Ihrem Computer installiert ist. Sie können Node.js von der [offiziellen Website](https://nodejs.org/) herunterladen und installieren.

7. **Installieren Sie die Projektabhängigkeiten (falls vorhanden):**

    ```bash
    npm install
    ```

   Dadurch werden alle in der `package.json`-Datei aufgeführten Abhängigkeiten installiert.

## Starten Sie den Entwicklungsserver

8. **Starten Sie den Entwicklungsserver:**

    ```bash
    npm run dev
    ```

   Ihr Projekt ist jetzt für die lokale Entwicklung eingerichtet. Verwenden Sie `npm run dev`, um Ihren Entwicklungsserver zu starten und Ihre Anwendung zu testen.

---

Diese Anleitung hilft Ihnen, ein lokales Git-Repository einzurichten, die Haupt-Branches zu synchronisieren und npm für Ihr Projekt zu aktivieren. Passen Sie die `<URL>` entsprechend an, und stellen Sie sicher, dass Node.js auf Ihrem Computer installiert ist, bevor Sie npm verwenden können.
