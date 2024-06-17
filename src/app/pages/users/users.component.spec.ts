import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './users.component';
import { UsersService } from '../../services/users.service';
import { of } from 'rxjs';
import { User } from '../../models/user.model';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let usersService: UsersService;const mockUsers: User[] = [
    { id: 1, name: 'Alioune', email: 'alioune@example.com', gender: 'male', status: 'active' },
    { id: 2, name: 'aby', email: 'aby@example.com', gender: 'female', status: 'inactive' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersComponent],
      imports: [
        HttpClientTestingModule,
        MatTableModule,
        MatSortModule,
        BrowserAnimationsModule
      ],
      providers: [UsersService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService);
    spyOn(usersService, 'getUsers').and.returnValue(of(mockUsers));
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should fetch users on init and set dataSource', () => {
    fixture.detectChanges();
    expect(usersService.getUsers).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockUsers);
  });

  it('should set the MatSort for dataSource', () => {
    fixture.detectChanges();
    expect(component.dataSource.sort).toBe(component.sort);
  });

  it('should call goBack method', () => {
    spyOn(window.history, 'back');
    component.goBack();
    expect(window.history.back).toHaveBeenCalled();
  });
});
