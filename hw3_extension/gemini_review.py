import os
import sys
from google import genai

# Setup API Key
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    print("Error: GEMINI_API_KEY not found in environment variables.")
    sys.exit(1)

client = genai.Client(api_key=GEMINI_API_KEY)

def get_input():
    """Get selected text from IDE."""
    # Priority: Command line arguments (IntelliJ External Tool behavior)
    if len(sys.argv) > 1:
        return " ".join(sys.argv[1:])

    # Fallback: Stdin
    if not sys.stdin.isatty():
        data = sys.stdin.read()
        if data.strip():
            return data

    return None

def main():
    selected_code = get_input()
    
    if not selected_code:
        print("No code selected for review.")
        sys.exit(1)

    # Read the prompt template
    script_dir = os.path.dirname(os.path.abspath(__file__))
    prompt_path = os.path.join(script_dir, "review_prompt.txt")
    
    try:
        with open(prompt_path, "r", encoding="utf-8") as f:
            prompt_template = f.read()
    except FileNotFoundError:
        print("Error: review_prompt.txt not found.")
        sys.exit(1)

    # Combine prompt with selected code
    final_prompt = prompt_template.replace("{code}", selected_code)

    print("Sending code to Gemini for review...\n")

    try:
        # Call Gemini API
        response = client.models.generate_content(
            model="gemini-3-flash-preview",
            contents=final_prompt
        )
        
        # Print the review result
        print("--- GEMINI CODE REVIEW ---")
        print(response.text)
        print("--------------------------")
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()