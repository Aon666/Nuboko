import {
    Component,
    ElementRef,
    ViewChild,
    AfterViewInit,
    OnDestroy,
    Input,
    Output,
    EventEmitter,
    ViewEncapsulation 
} from "@angular/core";

import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLine } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { markdown } from '@codemirror/lang-markdown';
import { VaultService } from './vault-service';


@Component({
    selector: 'app-workbench',
    standalone: true,
    templateUrl: './workbench.html',
    styleUrl: './workbench.css',
    encapsulation: ViewEncapsulation.None
})
export class WorkbenchComponent implements AfterViewInit, OnDestroy {
    @ViewChild('editorContainer') private editorRef!: ElementRef<HTMLDivElement>;

    @Input() content: string='';
    @Output() contentChange = new EventEmitter<string>();

    private view?: EditorView;

    constructor(private vaultService: VaultService){}

    ngAfterViewInit(): void {
        const updateListener = EditorView.updateListener.of((update) => {
            if(update.docChanged) {
                const currentDoc = update.state.doc.toString();
                this.contentChange.emit(currentDoc);
            }
        });

        const state = EditorState.create({
            doc: this.content,
            extensions: [
                lineNumbers(),
                highlightActiveLine(),
                history(),
                markdown(),
                keymap.of([...defaultKeymap, ...historyKeymap]),
                updateListener,
                EditorView.lineWrapping
            ]
        });

        this.view = new EditorView({
            state,
            parent: this.editorRef.nativeElement
        });
    }

    ngOnDestroy(): void {
        this.view?.destroy();
    }

    onLoadButtonClick(): void {
        console.log("Button clicked!!!!!");
        this.vaultService.connectVault();
    }
}