using System; 
using System.Collections.Generic; 
namespace Models 
 {public partial class Blog 
{public number Id { get; set; }
public string Title { get; set; }
public string Discription { get; set; }
public string ImageUrl { get; set; }
public DateTime Date { get; set; }
public number IdUser { get; set; }
public virtual User User { get; set; }
public virtual Category Category { get; set; }
}
}
