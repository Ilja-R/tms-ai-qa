# Gemini Code Review Extension (IntelliJ IDEA)

This tool allows you to perform AI-powered code reviews directly within IntelliJ IDEA using Google's Gemini API.

## Prerequisites

1.  **Python 3.x** installed.
2.  **Gemini API Key**: Obtain one from [Google AI Studio](https://aistudio.google.com/).
3.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

## Setup in IntelliJ IDEA

To integrate this script as an "External Tool" in IntelliJ IDEA:

1.  **Open Settings**: Go to `File` -> `Settings` (or `IntelliJ IDEA` -> `Settings` on macOS).
2.  **Navigate to External Tools**: Go to `Tools` -> `External Tools`.
3.  **Add a New Tool**: Click the `+` icon.
4.  **Configure the Tool**:
    *   **Name**: `Gemini Code Review`
    *   **Group**: `External Solutions`
    *   **Description**: `Performs a code review of the selected text using Gemini.`
    *   **Program**: `python` (or provide the full path to your python executable, e.g., `/usr/bin/python3` or `C:\Python310\python.exe`)
    *   **Arguments**: `{path_to_gemini_review.py}\gemini_review.py "$SelectedText$"`
        *   *Note: Ensure the path to `gemini_review.py` is correct.*
    *   **Working directory**: `$ProjectFileDir$`
5.  **Environment Variables**:
    *   Click on the `...` next to Environment Variables (if available in your IDE version) or ensure `GEMINI_API_KEY` is set in your system's environment variables.
6.  **Click OK**.

## How to Use

1.  Highlight any code snippet in your IntelliJ editor.
2.  Right-click the selected code.
3.  Choose **External Solutions** -> **Gemini Code Review**.
4.  The review results will appear in the IntelliJ **Run/Output** console.

## Customizing the Prompt

You can customize the review instructions by editing `review_prompt.txt`. Use `{code}` as a placeholder for where the selected text should be inserted.
