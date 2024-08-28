  export const addButtonToLoadedSite = () => {
    setTimeout(() => {
      const selection = window.getSelection();
      if (!selection || selection.toString().length === 0) return;
      const selectedText = selection.toString();
      const popup = document.createElement('button');
      popup.setAttribute('id', 'button_popup');
      popup.style.position = 'absolute';
      popup.style.backgroundColor = '#FFF';
      popup.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      popup.style.border = '1px solid #000';
      popup.style.borderRadius = '0.375rem';
      popup.style.padding = '5px';
      popup.style.zIndex = '10000';
      popup.style.top = `${
        window.scrollY + selection.getRangeAt(0).getBoundingClientRect().top + 10
      }px`;
      popup.style.left = `${
        selection.getRangeAt(0).getBoundingClientRect().left + popup.getBoundingClientRect().width
      }px`;
      popup.textContent = 'Save Highlight';
      popup.onclick = function () {
        const title = document.title;
        const url = window.location.href;
        window.electron.send('save-highlight', { url, title, text: selectedText });
        selection.removeAllRanges();
        (this as HTMLButtonElement).remove();
      };
      popup.addEventListener('focus', function () {
        this.style.borderColor = 'orange';
      });
      popup.onblur = function () {
        (this as HTMLButtonElement).remove();
      };
      document.body.appendChild(popup);
      popup.focus();
    }, 0);
  };