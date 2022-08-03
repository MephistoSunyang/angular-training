import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less'],
})
export class UsersComponent implements OnInit {
  public roles: any[] = [];
  public loading = false;
  public users: any[] = [];
  public modalVisible = false;
  public userForm!: FormGroup;
  public id = 0;
  public disabled = false;
  public saving = false;
  public deleteId = 0;

  constructor(private readonly httpClient: HttpClient) {}

  private userFormBuilder() {
    this.userForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      roleId: new FormControl(null),
    });
    this.userForm.statusChanges.subscribe((status: string) => {
      this.disabled = status !== 'VALID';
    });
  }

  private async getRoles() {
    const roles = await firstValueFrom(
      this.httpClient.get<any[]>(
        'https://62e1f058fa99731d75dd95d2.mockapi.io/roles'
      )
    );
    this.roles = roles;
    console.log('get roles result: ', roles);
  }

  public ngOnInit(): void {
    this.userFormBuilder();
    this.getRoles();
    this.getUsers();
  }

  public async getUsers() {
    this.loading = true;
    const users = await firstValueFrom(
      this.httpClient.get<any[]>(
        'https://62e1f058fa99731d75dd95d2.mockapi.io/users'
      )
    );
    this.loading = false;
    this.users = users;
    console.log('get users result: ', users);
  }

  public roleName(roleId: number) {
    const role = this.roles.find(({ id }) => id === roleId);
    return role ? role.name : '';
  }

  public openModal(user?: any) {
    let form = {};
    if (user) {
      this.id = user.id;
      form = {
        username: user.username,
        password: user.password,
        roleId: user.roleId,
      };
    } else {
      form = {
        roleId: '',
      };
    }
    this.userForm.reset(form);
    this.modalVisible = true;
  }

  public closeModal() {
    this.id = 0;
    this.modalVisible = false;
  }

  public async saveUser() {
    this.saving = true;
    let user;
    if (this.id === 0) {
      user = await firstValueFrom(
        this.httpClient.post(
          'https://62e1f058fa99731d75dd95d2.mockapi.io/users',
          this.userForm.value
        )
      );
    } else {
      user = await firstValueFrom(
        this.httpClient.put(
          `https://62e1f058fa99731d75dd95d2.mockapi.io/users/${this.id}`,
          this.userForm.value
        )
      );
    }
    console.log('save user result: ', user);
    this.saving = false;
    this.modalVisible = false;
    await this.getUsers();
  }

  public async deleteUser(id: number) {
    this.deleteId = id;
    const user = await firstValueFrom(
      this.httpClient.delete(
        `https://62e1f058fa99731d75dd95d2.mockapi.io/users/${id}`
      )
    );
    console.log('delete user result: ', user);
    this.deleteId = 0;
    await this.getUsers();
  }
}
