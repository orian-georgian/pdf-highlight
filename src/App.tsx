import pdfFile from './assets/wa-cigna-dental-preventive-policy.pdf'
import { PdfViewer } from './components/PdfViewer'
import { TextOptions } from './components/TextOptions';
import { SelectedTextProvider } from './contexts/SelectedTextContext';
import { AppContainer, ContentContainer, StickyContainer } from './App.styles';

function App() {
  return (
    <SelectedTextProvider>
      <AppContainer>
        <StickyContainer>
          <TextOptions />
        </StickyContainer>
        <ContentContainer>
          <PdfViewer pdfUrl={pdfFile} />
        </ContentContainer>
      </AppContainer>
    </SelectedTextProvider>
  );
}

export default App
