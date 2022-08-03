import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.less'],
})
export class RolesComponent implements OnInit {
  public loading = false;
  public roles: any[] = [];
  public modalVisible = false;
  public roleForm!: FormGroup;
  public id = 0;
  public disabled = false;
  public saving = false;
  public deleteId = 0;

  constructor(private readonly httpClient: HttpClient) {}

  private roleFormBuilder() {
    this.roleForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
    });
    this.roleForm.statusChanges.subscribe((status: string) => {
      this.disabled = status !== 'VALID';
    });
  }

  public ngOnInit(): void {
    this.roleFormBuilder();
    this.getRoles();
  }

  public async getRoles() {
    this.loading = true;
    const roles = await firstValueFrom(
      this.httpClient.get<any[]>(
        'https://62e1f058fa99731d75dd95d2.mockapi.io/roles'
      )
    );
    this.loading = false;
    this.roles = roles;
    console.log('get roles result: ', roles);
  }

  public openModal(role?: any) {
    let form = {};
    if (role) {
      this.id = role.id;
      form = {
        name: role.name,
      };
    }
    this.roleForm.reset(form);
    this.modalVisible = true;
  }

  public closeModal() {
    this.id = 0;
    this.modalVisible = false;
  }

  public async saveRole() {
    this.saving = true;
    let role;
    if (this.id === 0) {
      role = await firstValueFrom(
        this.httpClient.post(
          'https://62e1f058fa99731d75dd95d2.mockapi.io/roles',
          this.roleForm.value
        )
      );
    } else {
      role = await firstValueFrom(
        this.httpClient.put(
          `https://62e1f058fa99731d75dd95d2.mockapi.io/roles/${this.id}`,
          this.roleForm.value
        )
      );
    }
    console.log('save role result: ', role);
    this.saving = false;
    this.modalVisible = false;
    await this.getRoles();
  }

  public async deleteRole(id: number) {
    this.deleteId = id;
    const role = await firstValueFrom(
      this.httpClient.delete(
        `https://62e1f058fa99731d75dd95d2.mockapi.io/roles/${id}`
      )
    );
    console.log('delete role result: ', role);
    this.deleteId = 0;
    await this.getRoles();
  }
}
