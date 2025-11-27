import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarroComponent } from './carro';

describe('CarroComponent', () => {
  let component: CarroComponent;
  let fixture: ComponentFixture<CarroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarroComponent] // Si CarroComponent es standalone, va en imports
      // si NO es standalone, usa: declarations: [CarroComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CarroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
