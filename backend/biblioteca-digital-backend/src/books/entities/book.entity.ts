import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from '../../catalog/entities/category.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255 })
  author: string;

  @Column({ length: 255, nullable: true })
  publisher: string;

  @Column({ length: 20, nullable: true })
  isbn: string;

  @Column({ length: 10, default: 'es' })
  language: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 255, nullable: true })
  coverImage: string;

  @Column({ length: 255 })
  filePath: string;

  @Column({ length: 50, nullable: true })
  fileFormat: string;

  @Column({ type: 'int', nullable: true })
  fileSize: number;

  @Column({ type: 'int', nullable: true })
  pages: number;

  @Column({ type: 'int', nullable: true })
  year: number;

  @Column({ type: 'boolean', default: false })
  isRecommended: boolean;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'int', default: 0 })
  downloadCount: number;

  @Column({ type: 'int', default: 0 })
  readCount: number;

  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ nullable: true })
  categoryId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 