using Microsoft.EntityFrameworkCore;

namespace Model
{
    public partial class MyContext : DbContext
    {
        public MyContext(DbContextOptions<MyContext> options) : base(options) { }

        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            /*{entities}*/


            modelBuilder
                .Users()
                ;
        }


        // partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
