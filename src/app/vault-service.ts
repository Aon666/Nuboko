import { Service } from '@angular/core';

export interface VaultFile {
    name: string;
    handle: FileSystemFileHandle;
    path: string;
}


@Service()
export class VaultService {

    private dirHandle?: FileSystemDirectoryHandle;

    async connectVault(): Promise<VaultFile[]>  {
        try{
            this.dirHandle = await window.showDirectoryPicker();
            return await this.loadFiles(this.dirHandle);
        } catch(error){
            console.log(error);
            return [];
        }
    }


    private async loadFiles(dir: FileSystemDirectoryHandle): Promise<VaultFile[]>{
        return [];
    }
}
