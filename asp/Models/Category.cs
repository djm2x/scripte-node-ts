using System;
using System.Collections.Generic;
namespace Models
{
    public partial class Category
    {
        public number Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<> Blogs { get; set; }
    }
}
